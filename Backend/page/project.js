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
        console.log(newObj);
        return newObj;
    });
    return ChangeResponse;
};

// 초기 로더 데이터
router.get('/', async (req, res, next) => {
    // const limit = 10;
    try {
        const sql = `select * from project order by id desc`;
        const response = await db.query(sql);
        const responseSkillArr = transformtoArr(response, ['skill', 'hashtag']);
        // console.log(responseSkillArr);
        res.status(200).json({
            resData: responseSkillArr,
        });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

// Project Insert
const insertQuery = async ({ project_description, ...project }) => {
    console.log('target!!');
    console.log(Object.values(project));
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

        await db.query(sql, Object.values(project));
        // project_Description 테이블에 데이터 삽입
        sql = `INSERT INTO project_description (
            project_key,
            project_description
        ) 
        VALUES (?, ?)`;
        await db.query(sql, [project.project_key, project_description]);
    } catch (error) {
        const err = new NotFoundError(error.message);
        throw err;
    }
};

// Project Update
const updateQuery = async ({ project_key, project_description, ...project }) => {
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
        await db.query(sql, test);

        // project_Description 테이블에 데이터 삽입
        sql = `update project_description set 
            project_key = ?,
            project_description = ? where project_key = ? `;
        await db.query(sql, [project_key, project_description, project_key]);
    } catch (error) {
        const err = new NotFoundError(error.message);
        throw err;
    }
};

const ProjectHandler = async (req, res, endPoint) => {
    // console.log(req.body);
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

    console.log(req.body);
    const typeString_skill = skill.join();
    const typeString_hashtag = hashtag.join();
    const formatingStartDate = startDate.split('T')[0];
    const formatingEndDate = endDate.split('T')[0]; // 변수명 오타 수정

    const project = {
        project_key: idx,
        title,
        company,
        skill: typeString_skill,
        hashtag: typeString_hashtag,
        description,
        startProject: formatingStartDate,
        endProject: formatingEndDate,
        project_url: projectUrl,
        project_description: projectDescription,
        thumbnail,
    };

    if (endPoint === 'add') {
        await insertQuery(project);
    } else {
        await updateQuery(project);
    }

    // project 테이블에 데이터 삽입
    res.status(200).json({ message: 'success' });
};

router.post('/add', async (req, res, next) => {
    try {
        const endPoint = 'add';
        await ProjectHandler(req, res, endPoint);
    } catch (error) {
        // console.error(error);
        const err = new NotFoundError(error.message); // NotFoundError가 커스텀 에러라면 이 부분은 적절히 처리
        next(err);
    }
});

router.post('/editProject', async (req, res, next) => {
    try {
        const endPoint = 'edit';
        await ProjectHandler(req, res, endPoint);
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

router.post('/edit', async (req, res, next) => {
    try {
        const { key } = req.body;
        const sql = `select * from project as a inner join 
        project_description as b on a.project_key = b.project_key where a.project_key =?
        `;
        const response = await db.query(sql, [key]);
        res.status(200).json(response[0]);
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

router.delete('/delete/:key', async (req, res, next) => {
    // console.log(req.body);
    try {
        const param = req.params.key;
        // console.log(param);
        const sql = `
            delete from project where project_key = '${param}'
        `;
        const response = await db.query(sql);
        res.status(200).json({ message: 'success' });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

const storage = multer.diskStorage({
    destination: (req, _, next) => {
        const key = req.params.key;
        const type = req.query.type;

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
router.post('/thunbnail/:key', upload.single('img'), async (req, res, next) => {
    const { url } = req.file;
    req.page.body = '1';
    // console.log('test :::: ', url);
    try {
        const imgUrl = `project/uploads/${url}`;
        return res.json({ message: 'success', fileUrl: imgUrl });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

router.get('/:key', async (req, res, next) => {
    const param = req.params.key;
    // console.log(param);
    try {
        const sql = `
            select * from project as a inner join project_description as b on a.project_key = b.project_key where a.project_key = ?;
        `;
        const result = await db.query(sql, [param]);
        if (!result || result.length === 0) {
            const err = new NotFoundError('이미 삭제된 게시물이거나 잘못된 접근입니다.');
            next(err);
        }
        res.status(200).json({ message: 'success', result: result[0] });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

router.post('/addproject', async (req, res, next) => {
    try {
        const { key, ProjectDescription } = req.body;

        const sql = `
            select * from project as a inner join project_description as b on a.project_key = b.project_key where a.project_key = ?;
        `;
        const result = await db.query(sql, [key]);

        if (result.length === 0) {
            // console.log('인서트');
            const sql = `
                insert into project_description(project_key , project_description) value(?,?);
            `;
            const result = await db.query(sql, [key, ProjectDescription]);
        } else {
            // console.log('업데이트');
            const sql = `
                update project_description set description = ? where project_key = ?;
            `;
            const result = await db.query(sql, [ProjectDescription, key]);
        }

        // // SELECT * FROM project AS a INNER JOIN project_description AS b ON a.project_key = b.project_key;
        return res.status(200).json({ message: 1 });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

module.exports = router;
