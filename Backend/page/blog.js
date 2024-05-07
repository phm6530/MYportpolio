const express = require('express');
const router = express.Router();

// 컨트롤러
const BlogController = require('../Controller/blogController');
const { blogUpload } = require('../config/fileUploadConfig');

router.get('/tab', BlogController.fetchCategoryList);
router.get('/:page', BlogController.fetchBlogPosts);
router.post('/post', BlogController.createBlogPost);
router.get('/postdetail/:key', BlogController.fetchPostDetail);

// post 이미지 업로더
router.post('/uploadimg/:category/:key', blogUpload.single('image'), BlogController.postImageUploader);

module.exports = router;
