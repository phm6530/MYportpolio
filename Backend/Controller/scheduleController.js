const { NotFoundError } = require('../util/error');
const { runTransaction } = require('../util/dbUtil');
const scheduleService = require('../service/scheduleService');

const handleGetScheduleData = async (req, res, next) => {
    try {
        const { restResponseData, DdayArr } = await runTransaction(async (conn) => {
            return scheduleService.getScheduleData(req, conn);
        });
        res.json({ message: 'success', restResponseData, D_Day: DdayArr });
    } catch (error) {
        const err = new NotFoundError('에러입니다.');
        next(err);
    }
};

const handleCreateSchedule = async (req, res, next) => {
    try {
        const response = await runTransaction((conn) => {
            const { schedule_date, work, category, schedule_key, important } = req.body;
            const sql = `insert into schedules(schedule_date , work , category,  schedule_key , important) value(?,?,?,?,?)`;

            return conn.query(sql, [schedule_date, work, category, schedule_key, important]);
        });
        res.json({ message: 'success', databaseInsert: response.affectedRows });
    } catch (error) {
        const err = new NotFoundError('에러입니다.');
        next(err);
    }
};

const handlePatchSchedule = async (req, res, next) => {
    try {
        const response = await runTransaction((conn) => {
            return scheduleService.updateScheduleData(req, conn);
        });
        res.json({ message: 'success', databaseInsert: response.affectedRows });
    } catch (error) {
        const err = new NotFoundError('에러입니다.');
        next(err);
    }
};

const handleDeleteSchedule = async (req, res, next) => {
    try {
        const response = await runTransaction((conn) => {
            const { schedule_key } = req.body;

            const sql = `delete from schedules where schedule_key = ?`;
            return conn.query(sql, [schedule_key]);
        });
        res.json({ message: 'success', databaseInsert: response.affectedRows });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

const handleTaskCompleteToggle = async (req, res, next) => {
    try {
        const response = runTransaction((conn) => {
            const { schedule_key } = req.body;
            const sql = `update schedules set complete = Not complete where schedule_key = ?`;
            return conn.query(sql, [schedule_key]);
        });
        res.json({ message: 'success', databaseInsert: response.affectedRows });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

const handleMyStatusTimer = async (_, res, next) => {
    try {
        const { categoryDailyTotals, newObj } = await runTransaction(async (conn) => {
            return scheduleService.getMyStatusTime(conn);
        });
        res.json({ message: 'success', timerData: newObj, categoryDailyTotals });
    } catch (error) {
        await conn.rollback();
        const err = new NotFoundError(error.message);
        next(err);
    }
};

const handleTimerstart = async (req, res, next) => {
    try {
        const response = await runTransaction((conn) => {
            return scheduleService.createTimerStart(req, conn);
        });
        res.json({ message: 'success', databaseInsert: response.affectedRows });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

const handleTimerend = async (req, res, next) => {
    try {
        const response = await runTransaction((conn) => {
            const { endTime } = req.body;
            const playing = 0;
            const sql = `
                UPDATE tasktimer 
                SET playing = ?, end_time = ? 
                WHERE playing = 1;
                `;

            return conn.query(sql, [playing, endTime]);
        });
        res.status(200).json({ message: 'success', databaseInsert: response.affectedRows });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

module.exports = {
    handleGetScheduleData,
    handleCreateSchedule,
    handlePatchSchedule,
    handleDeleteSchedule,
    handleTaskCompleteToggle,
    handleMyStatusTimer,
    handleTimerstart,
    handleTimerend,
};
