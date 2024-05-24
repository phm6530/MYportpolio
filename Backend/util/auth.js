const jwt = require('jsonwebtoken');
const { NotFoundError } = require('./error');
//sign = JWT 생성 //verify = JWT 검증

require('dotenv').config(); //.env 파일 읽기
const bcrypt = require('bcrypt');

//Token 검증 로직
const verify = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new NotFoundError('권한이 없습니다.');
    try {
        jwt.verify(token, process.env.JWT_SECRET, (_, decoded) => {
            req.id = decoded.id;
        });
        req.headers.authState = true;
        next();
    } catch (error) {
        console.log('에러');
        throw new NotFoundError('유효하지 않은 토큰입니다.');
    }
};

// 토근생성
const createToken = (id, role, admin_name) => {
    try {
        return jwt.sign({ id, role, name: admin_name }, process.env.JWT_SECRET, {
            expiresIn: '12h', // 토큰 유효시간 설정
        });
    } catch (error) {
        throw new NotFoundError('토큰 생성에 실패하였습니다...');
    }
};

// 비밀번호 해싱
const passwordHashing = async (passowrd) => {
    // console.log(passowrd);
    try {
        const hashPassword = await bcrypt.hash(passowrd, 10);
        return hashPassword;
    } catch (error) {
        throw new Error('비밀번호 hash 실패');
    }
};

module.exports = {
    passwordHashing,
    verify,
    createToken,
};
