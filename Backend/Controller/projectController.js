const { runTransaction } = require('../util/dbUtil');
const { NotFoundError } = require('../util/error');
const projectService = require('../service/projectService');

// 프로젝트 리스트 컨트롤러
const handleFetchProjectList = async (req, res, next) => {
    try {
        const result = await runTransaction(async (conn) => {
            return projectService.getProjectList(conn);
        });
        res.status(200).json({ resData: result });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

// 프로젝트 리스트 디테일
const handleFetchProjectDetail = async (req, res, next) => {
    try {
        const result = await runTransaction((conn) => {
            return projectService.getProjectDetail(req, next, conn);
        });
        res.status(200).json({ message: 'success', result });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

// 프로젝트 수정페이지
const handleFetchProjectEdit = async (req, res, next) => {
    try {
        const result = await runTransaction(async (conn) => {
            return projectService.getProjectEditDetail(req, conn);
        });
        res.status(200).json({ resData: result[0] || [] });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

// 수정 핸들러
const handleEditProject = async (req, res, next) => {
    try {
        await runTransaction((conn) => {
            // Edit 핸들러
            projectService.updateProjectHandler(req, conn);
        });
        res.status(200).json({ message: 'Project processed successfully' });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

module.exports = {
    handleFetchProjectList,
    handleFetchProjectDetail,
    handleFetchProjectEdit,
    handleEditProject,
};
