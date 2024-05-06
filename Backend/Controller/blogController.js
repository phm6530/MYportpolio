// 더미데이터
const { DUMMY_DATA } = require('../DUMMY_DATA');
const { NotFoundError } = require('../util/error');
const { getBlogPosts } = require('../service/blogService');

const { runTransaction } = require('../util/util');
const getConn = require('../util/configg'); //DB 연결

const parametersAuth = (category, itemParam) => {
    const validCategories = new Set(DUMMY_DATA.map((item) => item.cateGory.toLowerCase()));
    // const validItems = new Set(DUMMY_DATA.map((item) => item.item));
    const cateGoryList = ['react', 'next', 'scss', 'css'];

    // 입력 파라미터의 존재 여부 확인
    if (category !== 'all' && !validCategories.has(category.toLowerCase())) {
        throw new Error(`없는 카테고리 같네요..: ${category}`);
    }

    if (itemParam && !cateGoryList.includes(itemParam.toLocaleLowerCase())) {
        throw new Error(`없는 카테고리 같네요..: ${itemParam}`);
    }
};

// 탭

const blogTab = async (_, res, next) => {
    const conn = await getConn();
    try {
        let arr = {};

        const [allCount] = await conn.query('select count(*) as cnt from blog_post');
        arr['All'] = allCount[0].cnt;

        let sql = `
            SELECT
                bc.category_name AS category,
                sc.subcategory_name,
                (
                    SELECT COUNT(*)
                    FROM blog_post p
                    WHERE p.subcategory_id = sc.id
                ) AS post_count,
                (
                    CASE
                        WHEN EXISTS (
                            SELECT 1
                            FROM blog_post p
                            WHERE p.subcategory_id = sc.id
                            AND p.date >= CURRENT_DATE - INTERVAL 2 DAY
                        ) THEN 1
                        ELSE 0
                    END
                ) AS new
            FROM
                blog_categories bc
            LEFT JOIN
                blog_subcategories sc ON bc.id = sc.category_id;
        `;

        const [response] = await conn.query(sql);

        response.forEach((item) => {
            const { category, subcategory_name, post_count, new: post_new } = item;
            if (!arr[category]) {
                arr[category] = {};
            }
            arr[category][subcategory_name] = {
                post_count,
                post_new: post_new !== 0 ? true : false,
            };
        });

        console.log(arr);

        res.json({ message: 'success', resData: arr });
    } catch (error) {
        console.log(error);
        const err = new NotFoundError(error.message);
        next(err);
    }
};

// 랜딩 + paging
const blogPage = async (req, res, next) => {
    try {
        const page = req.params.page; // 페이지
        const category = req.query.category.toLocaleLowerCase(); //category
        const item = req.query.item === 'null' ? null : req.query.item; // subCategory
        const search = req.query.search === 'null' ? null : req.query.search;

        if (category || itemParam) {
            parametersAuth(category, item);
        }

        const { data, paging } = await getBlogPosts(DUMMY_DATA, page, category, item, search);
        res.json({ message: 'success', resData: data, paging });
    } catch (error) {
        next(new NotFoundError(error.message));
    }
};

const postImageUploader = async (req, res, next) => {
    try {
        const files = req.files;

        const filesUrl = files.map((file) => {
            return file.url;
        });

        console.log(filesUrl);

        res.json({ message: 'success' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    blogTab,
    blogPage,
    postImageUploader,
};
