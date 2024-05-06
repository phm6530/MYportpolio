const express = require('express');
const router = express.Router();
const multer = require('multer');
const { blogStorage } = require('../service/blogService');
const path = require('path');

// 컨트롤러
const BlogController = require('../Controller/blogController');

const upload = multer({ storage: blogStorage });

router.get('/tab', BlogController.blogTab);
router.get('/:page', BlogController.blogPage);
router.post('/uploadimg/:category/:key', upload.array('images'), BlogController.postImageUploader);

// 이미지 라우터
router.use('/uploads', express.static(path.join(global.appRoot, 'uploads')));

module.exports = router;
