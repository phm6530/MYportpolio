const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { NotFoundError } = require('../util/error'); //에러 인스턴스
const fs = require('fs');

const util = require('util');

const db = require('../util/config'); //DB 연결
db.query = util.promisify(db.query); //DB 프로미스 생성

const DUMMY_KEY = [
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'blog',
        item: 'react',
        date: '2024. 05. 01',
    },
];

const category = {
    All: 111,
    blog: {
        react: { count: 5, new: true },
        next: { count: 5, new: true },
        scss: { count: 1, new: false },
        css: { count: 0, new: false },
    },
    code: {
        react: { count: 3, new: true },

        scss: { count: 1, new: false },
    },
    etc: {
        react: { count: 3, new: true },
        next: { count: 5, new: true },
    },
};

router.get('/tab', async (req, res, next) => {
    console.log('호출55');
    try {
        res.json({ message: 'success', resData: category });
    } catch (error) {
        const err = new NotFoundError(error.message);
        console.log(err);
        next(err);
    }
});

//페이징
const pageCalculator = (page) => {
    const limit = 10;
    const firstIdx = (page - 1) * limit;
    const lastIdx = limit * page;
    return { firstIdx, lastIdx };
};

// page Calculator
router.get('/:page', async (req, res, next) => {
    const page = req.params.page; // 페이지

    const category = req.query.category; //category
    const item = req.query.item; // subCategory

    const { firstIdx, lastIdx } = pageCalculator(page);

    const asdf = DUMMY_KEY.slice(firstIdx, lastIdx);

    try {
        res.json({ message: 'success', resData: asdf });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
});

const test = DUMMY_KEY.length;
console.log(test);

module.exports = router;
