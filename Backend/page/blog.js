const express = require('express');
const router = express.Router();

// 컨트롤러
const BlogController = require('../Controller/blogController');
const { blogUpload } = require('../config/fileUploadConfig');

// 뷰어
router.get('/tab', BlogController.fetchCategoryList);
router.get('/posts/newlist', BlogController.fetchNewpostList);
router.get('/posts/:page', BlogController.fetchBlogPosts);
router.post('/post', BlogController.createBlogPost);

// 관련 카테고리 게시물
router.get('/posts/:id/related', BlogController.fetchPostRelated);

// 디테일 + 컨트롤
router.get('/postdetail/:key', BlogController.fetchPostDetail);
router.delete('/deletepost/:key', BlogController.deletePostDetail);
router.patch('/modify/:id', BlogController.patchPostDetail);

// post 이미지 업로더
router.post('/uploadimg/:category/:key', blogUpload.single('image'), BlogController.postImageUploader);

module.exports = router;
