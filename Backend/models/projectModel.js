const fetchEditProjectModel = (conn) => {
    return {
        fetchEditRequest: async (key) => {
            const sql = `
            select * from 
                project as a 
            inner join 
                project_description as b on a.project_key = b.project_key 
            where a.project_key =?
    `;
            const [response] = await conn.query(sql, [key]);
            return response;
        },
    };
};

const projectActionModel = (conn) => {
    return {
        projectAction: () => {
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
            return conn.query(sql, test);
        },
    };
};

module.exports = {
    fetchEditProjectModel,
    projectActionModel,
};
