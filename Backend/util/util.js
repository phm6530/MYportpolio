const { NotFoundError } = require('./error');
const jwt = require('jsonwebtoken');
//DB 연동
const { compare } = require('bcrypt');
const { runTransaction } = require('../service/databaseService');
require('dotenv').config();

const isValidAdmin = async (id, userPassword) => {
    return runTransaction(async (conn) => {
        const sql = `select * from admin_user where id = ?`;
        const [response] = await conn.query(sql, [id]);

        if (response.length === 0) {
            throw new NotFoundError('등록된 관리자가 아닙니다.');
        }

        const responsePasword = response[0].password;
        const isMatch = await compare(userPassword, responsePasword);
        if (!isMatch) {
            throw new NotFoundError('비밀번호가 맞지않습니다.');
        }

        let result = {};
        for (const item in response[0]) {
            if (item !== 'password') {
                result[item] = response[0][item];
            }
        }
        return result;
    });
};

exports.isValidAdmin = isValidAdmin;
