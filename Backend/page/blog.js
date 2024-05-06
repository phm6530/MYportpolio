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

// post 이미지 업로더
router.post('/uploadimg/:category/:key', upload.single('image'), BlogController.postImageUploader);

module.exports = router;
