const express = require('express');
const router = express.Router();

// 컨트롤러
const BlogController = require('../Controller/blogController');
const { blogUpload } = require('../config/fileUploadConfig');

router.get('/tab', BlogController.fetchCategoryList);
router.get('/posts/newlist', BlogController.fetchNewpostList);
router.get('/posts/:page', BlogController.fetchBlogPosts);
router.post('/post', BlogController.createBlogPost);

router.get('/posts/:id/related', BlogController.fetchPostRelated);

router.get('/postdetail/:key', BlogController.fetchPostDetail);
router.delete('/deletepost/:key', BlogController.deletePostDetail);
router.patch('/modify/:id', BlogController.patchPostDetail);

// post 이미지 업로더
router.post('/uploadimg/:category/:key', blogUpload.single('image'), BlogController.postImageUploader);

module.exports = router;
