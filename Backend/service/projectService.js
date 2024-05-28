const { NotFoundError } = require('../util/error');
const projectModel = require('../models/projectModel');

const transformProperty = (target) => {
    const [{ end_date, project_url, start_date, project_key, project_description, ...rest }] = target;
    const camelTransformItem = {
        endDate: end_date,
        startDate: start_date,
        projectUrl: project_url,
        projectKey: project_key,
        projectDescription: project_description,
        ...rest,
    };
    return camelTransformItem;
};

const transformtoArr = (targetArr, keys) => {
    const ChangeResponse = targetArr.map((obj) => {
        const newObj = { ...obj };
        keys.forEach((key) => {
            if (typeof newObj[key] === 'string') {
                newObj[key] = newObj[key].split(',');
            } else {
                newObj[key] = [];
            }
        });
        return newObj;
    });
    return ChangeResponse;
};

// 프로젝트 리스트
const getProjectList = async (conn) => {
    const [rows] = await conn.query('SELECT * FROM project ORDER BY id DESC');
    const newResult = rows.map((item) => {
        return transformProperty([item]);
    });
    return transformtoArr(newResult, ['skill', 'hashtag']);
};

// 프로젝트 디테일
const getProjectDetail = async (req, next, conn) => {
    const param = req.params.key;
    const sql = `
        select * from project as a inner join project_description as b on a.project_key = b.project_key where a.project_key = ?;
    `;
    const [rows] = await conn.query(sql, [param]);
    if (!rows || rows.length === 0) {
        const err = new NotFoundError('이미 삭제된 게시물이거나 잘못된 접근입니다.');
        next(err);
    }
    const result = transformtoArr(rows, ['skill', 'hashtag']);
    return transformProperty(result);
};

// 프로젝트 수정 타겟 데이터 get
const getProjectEditDetail = async (req, conn) => {
    const model = projectModel.fetchEditProjectModel(conn);
    const key = req.params.key;
    const fetchData = await model.fetchEditRequest(key);
    const transformData = transformProperty(fetchData);
    const [result] = transformtoArr([transformData], ['skill', 'hashtag']);
    console.log(result);
    return result;
};

// 프로젝트 수정 or 생성
const actionProjectDetail = async (req, conn) => {
    const actionModel = projectModel.projectActionModel(conn);
    const pageType = req.query.type; //페이지 쿼리스트링으로 분기
    const data = req.body;

    const project = {
        ...data,
        startDate: data.startDate.split('T')[0],
        endDate: data.endDate.split('T')[0],
        skill: data.skill.join(','),
        hashtag: data.hashtag.join(','),
    };

    await actionModel.projectAction(project, pageType);
    await actionModel.projectActionDescription(project, pageType);
    // project_Description 테이블에 데이터 삽입
};

module.exports = {
    getProjectList,
    getProjectDetail,
    getProjectEditDetail,
    actionProjectDetail,
};
