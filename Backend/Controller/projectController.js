const { runTransaction } = require('../util/dbUtil');
const { NotFoundError } = require('../util/error');
const projectService = require('../service/projectService');

// 프로젝트 리스트 컨트롤러
const fetchProjectList = async (req, res, next) => {
    try {
        const result = await runTransaction(async (conn) => {
            return projectService.fetchList(conn);
        });
        res.status(200).json({
            resData: result,
        });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

// 프로젝트 리스트 디테일
const fetchProjectDetail = async (req, res, next) => {
    try {
        const result = await runTransaction((conn) => {
            return projectService.fetchDetail(req, next, conn);
        });
        res.status(200).json({ message: 'success', result });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

module.exports = {
    fetchProjectList,
    fetchProjectDetail,
};
