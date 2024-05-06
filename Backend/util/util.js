const { compare } = require('bcrypt');
const { NotFoundError } = require('./error');

//DB 연동
const db = require('../util/config');
const jwt = require('jsonwebtoken');
const getConn = require('../util/configg');
require('dotenv').config();

const runTransaction = async (callback) => {
    const conn = await getConn();
    try {
        await conn.beginTransaction();

        // 콜백 함수 실행
        const result = await callback(conn);

        await conn.commit(); // 트랜잭션 커밋
        return result;
    } catch (error) {
        if (conn) {
            await conn.rollback(); // 트랜잭션 롤백
        }
        throw error;
    } finally {
        if (conn) {
            conn.release(); // 커넥션 반환
        }
    }
};

const isValidAdmin = async (id, userPassword) => {
    return runTransaction(async (conn) => {
        const sql = `select * from admin_user where id = ?`;
        const [response] = await conn.query(sql, [id]);

        if (response.length === 0) {
            throw new NotFoundError('등록된 관리자가 아닙니다.');
        }

        const responsePasword = response[0].password;
        const isMatch = await compare(userPassword, responsePasword);
        if (!isMatch) {
            throw new NotFoundError('비밀번호가 맞지않습니다.');
        }

        let result = {};
        for (const item in response[0]) {
            if (item !== 'password') {
                result[item] = response[0][item];
            }
        }

        return result;
    });
};

const isDeleteReply = async ({ reply_password, board_key, auth }, token) => {
    return runTransaction(async (conn) => {
        const sql_ReplyFind = `select * from board where board_key = ? `;
        const [boardRecord] = await conn.query(sql_ReplyFind, [board_key]);

        if (!boardRecord || boardRecord.length === 0) {
            throw new NotFoundError('이미 삭제되었거나 서버에 문제가 있습니다.');
        }

        // 인증된 사용자면 토큰 검사해서 삭제하고 아니면 비번 검사하기
        if (auth) {
            try {
                jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                throw new NotFoundError('유효하지 않은 토큰입니다.');
            }
        } else {
            const isMatch = await compare(reply_password, boardRecord[0].user_password);
            if (!isMatch) {
                throw new NotFoundError('비밀번호가 맞지않습니다.');
            }
        }

        const sql_delete = `delete from board where board_key = ? `;
        const deleteResult = await conn.query(sql_delete, [board_key]);
        const isDeleted = deleteResult.affectedRows > 0;

        const sql_cnt = `select count(*) as cnt from board`;
        const [counter] = await conn.query(sql_cnt);

        return {
            isDeleted,
            isDeleted_key: board_key,
            counter: counter[0].cnt,
        };
    });
};

exports.isValidAdmin = isValidAdmin;
exports.isDeleteReply = isDeleteReply;
exports.runTransaction = runTransaction;
