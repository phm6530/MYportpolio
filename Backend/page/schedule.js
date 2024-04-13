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
            // console.log(response);
            // console.log('response ::::::: ', response);
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
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction(); //트랜잭션 생성
            const sql = `select * from tasktimer where playing = 1;`;
            const [rows] = await conn.query(sql);

            const curMonthInCategoryTime = `
                    SELECT category, date, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(end_time, start_time)))) as totalTime
                    FROM tasktimer
                    WHERE playing = 0 
                    GROUP BY category, date order by date;
                    `;
            const [curData] = await conn.query(curMonthInCategoryTime);

            // 한국 일자
            const getKrTime = (date) => {
                return new Date(date.getTime() + 9 * 60 * 60 * 1000);
            };

            const categoryDailyTotals = curData.map((e) => ({
                ...e,
                date: getKrTime(e.date).toISOString().split('T')[0],
            }));

            conn.release();
            let newObj = null;

            if (!!rows[0]) {
                newObj = { ...rows[0], date: getKrTime(rows[0].date).toISOString().split('T')[0] };
            }

            res.json({ message: 'success', timerData: newObj, categoryDailyTotals });
        } catch (error) {
            await conn.rollback();
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
        const conn = await db.getConnection();

        try {
            await conn.beginTransaction(); // 트랜잭션 시작

            const selectSql = `SELECT * FROM tasktimer WHERE playing = 1`;
            const [playTimer] = await conn.query(selectSql);

            if (!!playTimer[0]) {
                const { id, category, user_id } = playTimer[0];
                console.log(id);
                // console.log('연결');
                const updateSql = `UPDATE tasktimer SET playing = 0, end_time = '23:59:59' WHERE id = ?`;
                const [updateResponse] = await conn.query(updateSql, [id]);
                if (updateResponse.affectedRows === 1) {
                    const insertSql = `
                        INSERT INTO tasktimer(category, start_time, user_id, date, playing)
                        VALUES (?, '00:00:00', ?, CURDATE(), 1);
                    `;
                    const insertResponse = await conn.query(insertSql, [category, user_id]);

                    if (insertResponse.affectedRows === 0) {
                        throw new Error('업데이트가 처리되지 않았습니다.');
                    }
                }
                await conn.commit(); // 트랜잭션 커밋
                console.log('실행');
                // 웹소켓에서는 JSON, XML를 가정하지않기때문에 JSOn.stringfly해서 보내야댐
                ws.send(JSON.stringify({ status: 'success', message: '타이머가 갱신 되었습니다..', timerSet: true }));
            } else {
                console.log('실행');
                ws.send(JSON.stringify({ status: 'success', message: '갱신할 타이머가 없습니다.', timerSet: false }));
            }
        } catch (error) {
            await conn.rollback(); // 에러 발생 시 롤백
            ws.send(JSON.stringify({ status: 'error', message: error.message }));
        } finally {
            conn.release(); // 연결 해제
        }
    };

    schedule.scheduleJob('0 0 * * *', () => {
        wss.clients.forEach((client) => {
            timerRestart(client);
        });
    });

    wss.on('connection', () => {
        console.log('웹소켓 연결');
    });

    return router;
};

module.exports = ScheduleRouter;
