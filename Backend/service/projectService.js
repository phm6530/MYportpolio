const { NotFoundError } = require('../util/error');

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
    return transformtoArr(rows, ['skill', 'hashtag']);
};

// 프로젝트 리스트
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
    return rows[0];
};

// 프로젝트 수정 타겟 데이터 get
const getProjectEditDetail = async (req, conn) => {
    const key = req.params.key;
    const sql = `
        select * from 
            project as a 
        inner join 
            project_description as b on a.project_key = b.project_key 
        where a.project_key =?
`;
    const [response] = await conn.query(sql, [key]);
    return response;
};

const updateQuery = async ({ project_key, project_description, ...project }, conn) => {
    // project 테이블 업데이트 쿼리
    let sql = `UPDATE project SET 
            project_key = ?,
            title = ?, 
            company = ?, 
            skill = ?, 
            hashtag = ?,
            description = ?, 
            startProject = ?, 
            endProject = ?, 
            project_url = ?,
            thumbnail = ?
            WHERE project_key = ?`;

    const test = Object.values({ project_key, ...project });
    test.push(project_key);

    // project_key를 마지막에 넣어 WHERE 조건에 사용
    await conn.query(sql, test);

    // project_Description 테이블에 데이터 삽입
    sql = `update project_description set 
            project_key = ?,
            project_description = ? where project_key = ? `;
    await conn.query(sql, [project_key, project_description, project_key]);
};

const actionProjectDetail = async (req, conn) => {
    const endPoint = 'edit'; //파라미터 받을거임

    const data = req.body;

    const project = {
        project_key: data.idx,
        title: data.title,
        company: data.company,
        skill: data.skill.join(),
        hashtag: data.hashtag.join(),
        description: data.description,
        startProject: data.startDate.split('T')[0],
        endProject: data.endDate.split('T')[0],
        project_url: data.projectUrl,
        project_description: data.projectDescription,
        thumbnail: data.thumbnail,
    };

    if (endPoint === 'add') {
        await insertQuery(project, conn);
    } else {
        await updateQuery(project, conn);
    }
};

module.exports = {
    getProjectList,
    getProjectDetail,
    getProjectEditDetail,
    actionProjectDetail,
};
