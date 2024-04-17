const express = require('express');
const router = express.Router(); //라우터 연결
const { verify } = require('../util/auth');
const { passwordHashing } = require('../util/password');
const { validation_Reply } = require('../util/validate');
const { isDeleteReply } = require('../util/util');

// DB 연결
const util = require('util');

const db = require('../util/config');
const { NotFoundError } = require('../util/error');

// 전체 숫자 세기
const getTotalCount = async (conn) => {
    const count_sql = `SELECT COUNT(*) AS cnt FROM board`;
    const [counter] = await conn.query(count_sql);
    return counter.cnt;
};

const replyHandler = async (reqData, res, requestRoleType) => {
    const { userIcon, userName, contents, idx, password = null } = reqData;
    const conn = await db.getConnection();

    try {
        const limit = 1;
        let hashedPassword = undefined;
        let role = 0;

        // 일반 사용자의 경우 비밀번호 해싱 처리
        if (requestRoleType !== 'admin' && password) {
            hashedPassword = await passwordHashing(password);
        } else {
            role = 'admin';
        }
        let req_sql = `
            INSERT INTO 
            board (user_icon, user_name, user_password, contents, role , board_key, date) 
            VALUES (?, ?, ?, ?, ? , ?, NOW())`;

        await conn.query(req_sql, [userIcon, userName, hashedPassword, contents, role, idx]);

        let res_sql = `
            SELECT idx, user_icon, user_name, contents, board_key, date , role
            FROM board ORDER BY idx DESC LIMIT ?`;

        const [rows] = await conn.query(res_sql, [limit]);
        console.log('rows:: ', rows[0]);

        const count = await getTotalCount(conn);
        conn.release();
        return res.status(201).json({
            path: 'board/reply',
            counter: count,
            resData: rows[0],
        });
    } catch (error) {
        // 적절한 에러 처리
        return res.status(500).json({ message: 'Database insert failed' });
    }
};

// 댓글 등록완료
router.post('/reply', validation_Reply, async (req, res, next) => {
    const reqData = req.body;
    const requestRoleType = 'user';
    try {
        // replyHandler에 필요한 모든 인자 전달
        await replyHandler(reqData, res, requestRoleType);
    } catch (error) {
        next(error);
    }
});

// 댓글 등록완료
router.post('/reply/auth', verify, validation_Reply, async (req, res, next) => {
    const reqData = req.body;
    const page = 'admin';
    try {
        await replyHandler(reqData, res, page);
    } catch (error) {
        next(error);
    }
});

router.post('/reply/delete', async (req, res, next) => {
    const body = req.body;
    const token = req.headers.authorization.split(' ')[1] || undefined;
    try {
        const { isDeleted, isDeleted_key, counter } = await isDeleteReply(body, token);
        res.json({ message: '성공', isDeleted, isDeleted_key, counter });
    } catch (error) {
        console.log(error.message);
        res.status(error.status || 500).json({ message: error.message });
    }
});

// 한국날짜계산
const todayKoreaTime = () => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const koreaTime = new Date(utc + 3600000 * 9);

    return koreaTime.toISOString().split('T')[0];
};

// 초기로드 or 게시판 페이징
router.get('/:idx', async (req, res, next) => {
    const conn = await db.getConnection();
    await conn.beginTransaction();

    try {
        const idx = +req.params.idx;
        const limit = 10;

        const sql = `select idx, user_icon, user_name, contents, board_key, date, role
                     from board order by idx desc limit ? offset ?`;
        const [response_database] = await conn.query(sql, [limit, idx * limit]);

        const today = todayKoreaTime();
        const todayReplysql = `SELECT COUNT(*) AS cnt
        FROM board
        WHERE DATE(date) = ?`;

        const [todayRepley_response] = await conn.query(todayReplysql, [today]);
        let counter = null;

        if (idx === 0) {
            // 첫 페이지 요청 시에만 전체 카운트 전송
            const count_sql = `select count(*) as cnt from board`;
            const [count_result] = await conn.query(count_sql);
            counter = count_result[0].cnt;
        }

        const nextPage = response_database.length === limit ? idx + 1 : null;
        await conn.commit();

        res.status(201).json({
            path: 'paging',
            todayReply: todayRepley_response[0].cnt,
            counter: counter,
            pageData: response_database,
            nextPage: nextPage,
        });
    } catch (error) {
        const err = new NotFoundError();
        conn.rollback();
        next(err);
    } finally {
        conn.release();
    }
});

module.exports = router;
