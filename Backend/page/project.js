const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { NotFoundError } = require('../util/error'); //에러 인스턴스
const fs = require('fs');

const util = require('util');
const db = require('../util/config'); //DB 연결
db.query = util.promisify(db.query); //DB 프로미스 생성

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 문자열 배열로 변경 24-3-11 추가
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
        // console.log(newObj);
        return newObj;
    });
    return ChangeResponse;
};

// 초기 로더 데이터
router.get('/', async (req, res, next) => {
    console.log('초기로더');
    try {
        // DB 연결 확립
        const connection = await db.getConnection();

        // 쿼리 실행
        const [rows] = await connection.query('SELECT * FROM project ORDER BY id DESC');

        // 연결 해제
        connection.release();

        // 데이터 변환
        const responseSkillArr = transformtoArr(rows, ['skill', 'hashtag']);

        // 응답 전송
        res.status(200).json({
            resData: responseSkillArr,
        });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

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

const runTransaction = async (callback) => {
    let conn;
    try {
        conn = await db.getConnection();
        await conn.beginTransaction();

        // 콜백 함수 실행
        const result = await callback(conn);

        await conn.commit(); // 트랜잭션 커밋
        return result;
    } catch (error) {
        if (conn) {
            await conn.rollback(); // 트랜잭션 롤백
        }
        throw error;
    } finally {
        if (conn) {
            conn.release(); // 커넥션 반환
        }
    }
};

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

const storage = multer.diskStorage({
    destination: (req, _, next) => {
        const key = req.params.key;
        const type = req.query.type;
        console.log('gg');

        // console.log('type :::::::::::::::::::::::::::::::: ', type);
        const uploadPath = path.join(__dirname, `uploads/${key}/`); // 안전한 경로 구성
        if (!fs.existsSync(uploadPath)) {
            // 폴더가 존재하지 않는 경우
            fs.mkdirSync(uploadPath, { recursive: true }); // 폴더 생성
        }
        next(null, uploadPath);
    },
    filename: (req, file, next) => {
        const key = req.params.key;
        const type = req.query.type;

        // console.log('type :::::::::::::::::::::::::::::::: ', type);
        const date = new Date();
        const dateString = date.toISOString().replace(/:/g, '').replace(/-/g, '').replace('T', '').replace(/\..+/, '');

        // 파일의 원본 이름에서 확장자 추출
        const ext = path.extname(file.originalname);
        // 새 파일명 구성 (원하는 형식으로 파일명 변경 가능)
        const newFilename = `${key}_${dateString}${ext}`; // 예시: 'newFileName_20230315123000.jpg'
        file.url = `${key}/${newFilename}`;
        next(null, newFilename);
    },
});

const upload = multer({ storage: storage });

router.post('/imgUploader/:key', upload.single('img'), async (req, res, next) => {
    const { url } = req.file;
    try {
        const imgUrl = `project/uploads/${url}`;
        return res.json({ message: 'success', fileUrl: imgUrl });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

//single은 img만 딱 검사가능함

router.get('/:key', async (req, res, next) => {
    const param = req.params.key;
    console.log(param);
    try {
        const connection = await db.getConnection();
        const sql = `
            select * from project as a inner join project_description as b on a.project_key = b.project_key where a.project_key = ?;
        `;
        const [rows] = await connection.query(sql, [param]);
        console.log(rows[0]);

        if (!rows || rows.length === 0) {
            const err = new NotFoundError('이미 삭제된 게시물이거나 잘못된 접근입니다.');
            next(err);
        }
        connection.release();
        res.status(200).json({ message: 'success', result: rows[0] });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

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
