const fetchEditProjectModel = (conn) => {
    return {
        fetchEditRequest: async (key) => {
            const sql = `
            select * from 
                project as a 
            inner join 
                project_description as b on a.project_key = b.project_key 
            where a.project_key = ?
    `;
            const [response] = await conn.query(sql, [key]);
            return response;
        },
    };
};

const projectActionModel = (conn) => {
    return {
        projectAction: (
            { projectKey, title, company, skill, hashtag, description, startDate, endDate, projectUrl, thumbnail }, //디스크립션은 필요없음
            pageType, // 페이지 타입
        ) => {
            let sql = '';
            const params = [
                projectKey,
                title,
                company,
                skill,
                hashtag,
                description,
                startDate,
                endDate,
                projectUrl,
                thumbnail,
            ];
            // console.log(params);
            if (pageType === 'add') {
                sql = `
                    INSERT INTO 
                    project(
                        project_key ,
                        title,
                        company,
                        skill,
                        hashtag ,
                        description,
                        start_date,
                        end_date,
                        project_url, 
                        thumbnail
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
            } else {
                sql = `
                    UPDATE 
                        project 
                    SET
                        project_key = ?,
                        title = ?, 
                        company = ?, 
                        skill = ?, 
                        hashtag = ?,
                        description = ?, 
                        start_date = ?, 
                        end_date = ?, 
                        project_url = ?,
                        thumbnail = ?
                    WHERE 
                        project_key = ?
                `;
                params.push(projectKey);
            }

            return conn.query(sql, params);
        },
        projectActionDescription: ({ projectKey, projectDescription, ...project }, pageType) => {
            let sql = '';
            const params = [projectKey, projectDescription];
            if (pageType === 'add') {
                sql = `
                    INSERT INTO project_description (project_key, project_description)
                    VALUE (? , ?);
                `;
            } else {
                sql = `update project_description set 
                project_key = ?,
                project_description = ? where project_key = ? `;
                params.push(projectKey);
            }
            return conn.query(sql, params);
        },
    };
};

module.exports = {
    fetchEditProjectModel,
    projectActionModel,
};
