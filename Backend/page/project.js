const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { NotFoundError } = require('../util/error'); //에러 인스턴스
const fs = require('fs');
const { runTransaction } = require('../util/dbUtil');
const projectController = require('../Controller/projectController');
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Project리스트
router.get('/', projectController.fetchProjectList);

//single은 img만 딱 검사가능함
router.get('/:key', projectController.fetchProjectDetail);

// Project Insert
const insertQuery = async ({ project_description, ...project }, conn) => {
    try {
        let sql = `INSERT INTO project (
            project_key,
            title,
            company,
            skill,
            hashtag,
            description,
            startProject,
            endProject,
            project_url,
            thumbnail
        ) 
        VALUES (?, ?, ?, ?, ? , ?, ?, ?, ? , ?)`;

        await conn.query(sql, Object.values(project));
        // project_Description 테이블에 데이터 삽입
        sql = `INSERT INTO project_description (
            project_key,
            project_description
        ) 
        VALUES (?, ?)`;
        await conn.query(sql, [project.project_key, project_description]);
    } catch (error) {
        const err = new NotFoundError(error.message);
        await conn.rollback();
        throw err;
    }
};

// Project Update
const updateQuery = async ({ project_key, project_description, ...project }, conn) => {
    try {
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
    } catch (error) {
        const err = new NotFoundError(error.message);
        throw err;
    }
};

const ProjectHandler = async (req, res, endPoint, conn) => {
    const {
        idx,
        title,
        skill,
        projectUrl,
        hashtag,
        description,
        company,
        startDate,
        endDate,
        projectDescription,
        thumbnail,
    } = req.body;

    const typeString_skill = skill.join();
    const typeString_hashtag = hashtag.join();
    const formattedStartDate = startDate.split('T')[0];
    const formattedEndDate = endDate.split('T')[0];

    const project = {
        project_key: idx,
        title,
        company,
        skill: typeString_skill,
        hashtag: typeString_hashtag,
        description,
        startProject: formattedStartDate,
        endProject: formattedEndDate,
        project_url: projectUrl,
        project_description: projectDescription,
        thumbnail,
    };

    try {
        if (endPoint === 'add') {
            await insertQuery(project, conn);
        } else {
            await updateQuery(project, conn);
        }
        res.status(200).json({ message: 'Project processed successfully' });
    } catch (error) {
        console.error('Database operation failed:', error);
        res.status(500).json({ message: 'Database operation failed', error: error.message });
    }
};

router.post('/add', async (req, res, next) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const endPoint = 'add';
        await ProjectHandler(req, res, endPoint, conn);
    } catch (error) {
        const err = new NotFoundError(error.message); // NotFoundError가 커스텀 에러라면 이 부분은 적절히 처리
        await conn.rollback();
        next(err);
    } finally {
        conn.release();
    }
});

router.post('/editProject', async (req, res, next) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const endPoint = 'edit';
        await ProjectHandler(req, res, endPoint, conn);
    } catch (error) {
        const err = new NotFoundError(error.message);
        await conn.rollback();
        next(err);
    } finally {
        conn.release();
    }
});

router.post('/edit', async (req, res, next) => {
    return runTransaction(async (conn) => {
        try {
            const { key } = req.body;
            const sql = `select * from project as a inner join 
        project_description as b on a.project_key = b.project_key where a.project_key =?
        `;
            const [response] = await conn.query(sql, [key]);
            console.log(response);

            res.status(200).json({ resData: response[0] || [] });
        } catch (error) {
            const err = new NotFoundError(error.message);
            next(err);
        }
    });
});

router.delete('/delete/:key', async (req, res, next) => {
    return runTransaction(async (conn) => {
        try {
            const param = req.params.key;
            // console.log(param);
            const sql = `
                delete from project where project_key = '${param}'
            `;
            await conn.query(sql);
            res.status(200).json({ message: 'success' });
        } catch (error) {
            const err = new NotFoundError(error.message);
            next(err);
        }
    });
});

// router.post('/imgUploader/:key', upload.single('img'), async (req, res, next) => {
//     const { url } = req.file;
//     try {
//         const imgUrl = `project/uploads/${url}`;
//         return res.json({ message: 'success', fileUrl: imgUrl });
//     } catch (error) {
//         const err = new NotFoundError(error.message);
//         next(err);
//     }
// });

router.post('/addproject', async (req, res, next) => {
    const conn = await db.getConnection();

    try {
        const { key, ProjectDescription } = req.body;

        const sql = `
            select * from project as a inner join project_description as b on a.project_key = b.project_key where a.project_key = ?;
        `;
        const result = await conn.query(sql, [key]);

        if (result.length === 0) {
            // console.log('인서트');
            const sql = `
                insert into project_description(project_key , project_description) value(?,?);
            `;
            await conn.query(sql, [key, ProjectDescription]);
        } else {
            // console.log('업데이트');
            const sql = `
                update project_description set description = ? where project_key = ?;
            `;
            await conn.query(sql, [ProjectDescription, key]);
        }
        await conn.commit();
        // // SELECT * FROM project AS a INNER JOIN project_description AS b ON a.project_key = b.project_key;
        return res.status(200).json({ message: 1 });
    } catch (error) {
        const err = new NotFoundError(error.message);
        await conn.rollback();
        next(err);
    } finally {
        await conn.release();
    }
});

module.exports = router;
