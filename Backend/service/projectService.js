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
const fetchList = async (conn) => {
    const [rows] = await conn.query('SELECT * FROM project ORDER BY id DESC');
    return transformtoArr(rows, ['skill', 'hashtag']);
};

// 프로젝트 리스트
const fetchDetail = async (req, next, conn) => {
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

module.exports = {
    fetchList,
    fetchDetail,
};
