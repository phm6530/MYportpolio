const { NotFoundError } = require('../util/error');
const { postAction, rendingData, blogtabService } = require('../service/blogService');
const { runTransaction } = require('../util/util');

// 동적 탭
const fetchCategoryList = async (_, res, next) => {
    try {
        const categoryList = await runTransaction(async (conn) => {
            return blogtabService(conn);
        });

        console.log(categoryList);
        res.json({ message: 'success', resData: categoryList });
    } catch (error) {
        console.log(error);
        const err = new NotFoundError(error.message);
        next(err);
    }
};

// 초기랜딩 + paging
const fetchBlogPosts = async (req, res, next) => {
    try {
        const { data, paging } = await runTransaction(async (conn) => {
            return rendingData(conn, req);
        });

        res.json({ message: 'success', resData: data, paging });
    } catch (error) {
        next(new NotFoundError(error.message));
    }
};

//blog post img 업로더
const postImageUploader = async (req, res, next) => {
    try {
        const file = req.file;
        res.json({ message: 'success', imgUrl: file.url });
    } catch (err) {
        next(err);
    }
};

//post
const createBlogPost = async (req, res, next) => {
    try {
        const body = req.body;
        const result = await runTransaction(async (conn) => {
            const postResult = await postAction(conn, body);
            return postResult;
        });

        res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error.message);
        next(new NotFoundError(error.message));
    }
};

module.exports = {
    fetchCategoryList,
    fetchBlogPosts,
    postImageUploader,
    createBlogPost,
};
