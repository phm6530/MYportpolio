const express = require('express');
const router = express.Router();
const { NotFoundError } = require('../util/error'); // 에러 인스턴스 설정
const schedule = require('node-schedule');

// DB연결
const db = require('../util/config');

const ScheduleRouter = (wss) => {
    // 데이터 가져오기
    router.get('/', async (req, res, next) => {
        const { Year, month } = req.query;

        try {
            const conn = await db.getConnection();
            const sql = `
            SELECT 
            id, 
            work, 
            complete, 
            category,
            schedule_key, 
            DATE_FORMAT(schedule_date, '%Y-%m-%d') AS formatted_date, 
            important  
            FROM schedules 
            WHERE YEAR(schedule_date) = ? AND MONTH(schedule_date) = ?
        `;

            const [response] = await conn.query(sql, [Year, month]);
            const restResponseData = {};
            // console.log(response);

            for (const item in response) {
                const data = response[item].formatted_date;
                if (!restResponseData[data]) {
                    restResponseData[data] = []; // 해당날짜 없으면 만들기
                }
                restResponseData[data].push(response[item]);
            }

            const DdayArr = response.filter((e) => {
                return e.important === 2;
            });
            conn.release();
            res.json({ message: '성공', restResponseData, D_Day: DdayArr });
        } catch (error) {
            const err = new NotFoundError('에러입니다.');
            next(err);
        }
    });

    // insert
    router.post('/add', async (req, res, next) => {
        try {
            const conn = await db.getConnection();

            const { schedule_date, work, category, schedule_key, important } = req.body;
            const sql = `insert into schedules(schedule_date , work , category,  schedule_key , important) 
        value(?,?,?,?,?)`;

            const [response] = await conn.query(sql, [schedule_date, work, category, schedule_key, important]);
            console.log(response);
            console.log('response ::::::: ', response);
            conn.release();
            res.json({ message: 'success', databaseInsert: response.affectedRows });
        } catch (error) {
            const err = new NotFoundError('에러입니다.');
            next(err);
        }
    });

    // upDate
    router.post('/edit', async (req, res, next) => {
        const { work, schedule_key } = req.body;
        try {
            const conn = await db.getConnection();
            const sql = `update schedules set work = ? where schedule_key = ?`;
            const [response] = await conn.query(sql, [work, schedule_key]);
            conn.release();
            res.json({ message: 'success', databaseInsert: response.affectedRows });
        } catch (error) {
            const err = new NotFoundError('에러입니다.');
            next(err);
        }
    });

    // delete
    router.post('/delete', async (req, res, next) => {
        try {
            const conn = await db.getConnection();
            const { schedule_key } = req.body;

            const sql = `delete from schedules where schedule_key = ?`;
            const [response] = await conn.query(sql, [schedule_key]);

            if (response.affectedRows === 0) {
                throw new Error('삭제되지 않았습니다 재시도 해주세요.');
            }
            conn.release();

            res.json({ message: 'success', databaseInsert: response.affectedRows });
        } catch (error) {
            const err = new NotFoundError(error.message);
            next(err);
        }
    });

    // Complete Toggle
    router.post('/complete', async (req, res, next) => {
        try {
            const conn = await db.getConnection();
            const { schedule_key } = req.body;
            const sql = `update schedules set complete = Not complete where schedule_key = ?`;
            const [response] = await conn.query(sql, [schedule_key]);
            if (response.affectedRows === 0) {
                throw new Error('변경되지 않았습니다 재시도 해주세요.');
            }
            conn.release();
            res.json({ message: 'success', databaseInsert: response.affectedRows });
        } catch (error) {
            const err = new NotFoundError(error.message);
            next(err);
        }
    });

    // 타이머
    router.get('/timer', async (_, res, next) => {
        try {
            const conn = await db.getConnection();
            const sql = `select * from tasktimer where playing = 1;`;
            const [rows] = await conn.query(sql);
            conn.release();
            let newObj = null;
            if (!!rows[0]) {
                const getKRTime = new Date(rows[0].date.getTime() + 9 * 60 * 60 * 1000);
                newObj = { ...rows[0], date: getKRTime.toISOString().split('T')[0] };
            }

            res.json({ message: 'success', timerData: newObj });
        } catch (error) {
            const err = new NotFoundError(error.message);
            next(err);
        }
    });

    router.post('/timeraction', async (req, res, next) => {
        try {
            const conn = await db.getConnection();
            const { startTime, category, id, name } = req.body;
            const playing = 1;
            const sql = `
        insert into tasktimer(
            category , start_time,  user_id , date , playing
            ) value(?,?, ? , now(), ?);
        `;

            const [response] = await conn.query(sql, [category, startTime, id, playing]);
            if (response.affectedRows === 0) {
                throw new Error('변경되지 않았습니다 재시도 해주세요.');
            }
            conn.release();
            res.json({ message: 'success', databaseInsert: response.affectedRows });
        } catch (error) {
            const err = new NotFoundError(error.message);
            next(err);
        }
    });

    router.post('/timerEnd', async (req, res, next) => {
        try {
            const conn = await db.getConnection();
            const { endTime } = req.body;
            const playing = 0;
            const sql = `
                    UPDATE tasktimer 
                    SET playing = ?, end_time = ? 
                    WHERE playing = 1;
                    `;

            const [response] = await conn.query(sql, [playing, endTime]);
            if (response.affectedRows === 0) {
                throw new Error('변경되지 않았습니다 재시도 해주세요.');
            }
            conn.release();
            res.status(200).json({ message: 'success', databaseInsert: response.affectedRows });
        } catch (error) {
            const err = new NotFoundError(error.message);
            next(err);
        }
    });

    //
    const timerRestart = async (ws) => {
        // 데이터베이스 연결 가져오기 (트랜잭션 시작 전)
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction(); // 트랜잭션 시작

            const selectSql = `SELECT * FROM tasktimer WHERE playing = 1`;
            const [playTimer] = await connection.query(selectSql);

            if (!!playTimer) {
                const { id, category, user_id } = playTimer;

                const updateSql = `UPDATE tasktimer SET playing = 0, end_time = '23:59:59' WHERE id = ?`;
                const [updateResponse] = await connection.query(updateSql, [id]);

                if (updateResponse.affectedRows === 1) {
                    console.log('업데이트 하였습니다.');

                    const insertSql = `
                        INSERT INTO tasktimer(category, start_time, user_id, date, playing)
                        VALUES (?, '00:00:00', ?, CURDATE(), 1);
                    `;
                    const insertResponse = await connection.query(insertSql, [category, user_id]);

                    if (insertResponse.affectedRows === 0) {
                        throw new Error('업데이트가 처리되지 않았습니다.');
                    }
                }

                await connection.commit(); // 트랜잭션 커밋
                wss.clients.forEach((client) => {
                    client.send('타이머 갱신 완료');
                });
            } else {
                ws.send(JSON.stringify({ status: 'success', message: '갱신할 타이머가 없습니다.' }));
            }
        } catch (error) {
            await connection.rollback(); // 에러 발생 시 롤백
            ws.send(JSON.stringify({ status: 'error', message: error.message }));
        } finally {
            connection.release(); // 연결 해제
        }
    };
    // WebSocket 서버에서 각 연결에 대해
    wss.on('connection', function connection(ws) {
        schedule.scheduleJob('*/10 * * * * *', () => {
            timerRestart(ws); // 여기서 ws를 전달
        });
    });
    return router;
};

module.exports = ScheduleRouter;
