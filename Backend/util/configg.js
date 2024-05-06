const mysql = require('mysql2/promise');

//.env 파일 읽기

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    timezone: '+09:00',
});

// getConnection 메서드는 프로미스를 반환하므로 await을 사용하여 해결해야 합니다.
async function getConnection() {
    try {
        return await pool.getConnection();
    } catch (error) {
        console.error('Error getting database connection:', error);
        throw error;
    }
}

module.exports = getConnection;

// pool.connect((err) => {
//     if (err) {
//         console.error('연결 실패:', err.message);
//         // 여기서 에러를 처리하고 필요한 동작을 수행하세요.
//     } else {
//         console.log('연결 성공');
//     }
// });

// const mysql = require('mysql2/promise');
// //.env 파일 읽기

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     timezone: '+09:00',
// });

// const test = async () => {
//     try {
//         const connection = await pool.getConnection();
//         connection.release();
//         console.log('연결완료');
//     } catch (error) {
//         console.log('연결오류', error.message);
//     }
// };

// test();

// module.exports = pool;
