const { NotFoundError } = require('../util/error');
const { postInsert, postUpdate, rendingData, blogtabService, getDetail } = require('../service/blogService');
const { runTransaction, getConn } = require('../service/databaseService');

// 동적 탭
const fetchCategoryList = async (_, res, next) => {
    try {
        const categoryList = await runTransaction(async (conn) => {
            return blogtabService(conn);
        });

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
        console.log(error);
        next(new NotFoundError(error.message));
    }
};

//blog post img 업로더
const postImageUploader = async (req, res, next) => {
    console.log('실행');
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
            const postResult = await postInsert(conn, body);
            return postResult;
        });

        res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error.message);
        next(new NotFoundError(error.message));
    }
};

//post
const fetchPostDetail = async (req, res, next) => {
    try {
        const postKey = req.params;
        // console.log(postKey.key);
        const result = await runTransaction(async (conn) => {
            const postResult = await getDetail(conn, postKey.key);
            return postResult;
        });

        res.status(200).json({ message: 'success', resData: result });
    } catch (error) {
        console.log(error.message);
        next(new NotFoundError(error.message));
    }
};

//postDelete
const deletePostDetail = async (req, res, next) => {
    try {
        const result = await getConn(async (conn) => {
            const key = req.params.key;
            const sql_detetePost = 'delete from blog_metadata where post_id = ?;';
            const [row] = await conn.query(sql_detetePost, [key]);
            const isDelete = await row.affectedRows;
            return isDelete === 1 ? true : false;
        });
        res.status(200).json({ message: 'success', result });
    } catch (error) {
        const err = new NotFoundError(error.message);
        next(err);
    }
};

const patchPostDetail = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const result = await runTransaction(async (conn) => {
            const updateResult = await postUpdate(conn, body, id);
            return updateResult;
        });

        res.status(200).json({ message: 'success', resData: result });
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
    fetchPostDetail,
    deletePostDetail,
    patchPostDetail,
};
