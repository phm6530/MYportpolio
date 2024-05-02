const express = require('express'); // express 라이브러리 로드
const cors = require('cors'); // cors 검토
require('dotenv').config();

const http = require('http');
const app = express(); // 익스프레스 서버
const httpServer = http.createServer(app); //서버생성

const initializeWebSocket = require('./util/websoket');

const wss = initializeWebSocket(httpServer);

// page
const boardRouter = require('./page/notcie'); // Board
const blogRouter = require('./page/blog'); // Blog
const projectRouter = require('./page/project'); //프로젝트
const scheduleRouter = require('./page/schedule'); //스케줄
const authRouter = require('./page/authRouter'); //login logout 로직
const mailModuleRouter = require('./page/mailModule'); // 메일보내기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 게시판 로직
app.use(authRouter);
app.use('/board', boardRouter);
app.use('/blog', blogRouter);
app.use('/project', projectRouter);
app.use('/schedule', scheduleRouter(wss));
app.use('/mailModule', mailModuleRouter);

// 테스트 미들웨어
app.get('/test', (req, res, next) => {
    const param = req.params.item;
    if (!/^\d+$/.test(param)) {
        const err = new Error('사용 할 수 없음 ');
        next(err);
    } else {
        res.json({ item: param });
    }
});

// 에러 미들웨어
app.use((err, req, res, next) => {
    // console.log(err.message);
    res.status(err.status).json({ message: err.message }); // 에러 메시지를 JSON 응답으로 전송
});

httpServer.listen(8080, () => {
    console.log('Server Running...');
});
