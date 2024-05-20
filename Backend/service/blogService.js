require('dotenv').config();
const { DUMMY_DATA } = require('../DUMMY_DATA');

const { pageCalculator } = require('../featrues/common/paging');
const { query } = require('../util/configg');

const parametersAuth = (category, itemParam) => {
    const validCategories = new Set(DUMMY_DATA.map((item) => item.cateGory.toLowerCase()));
    const cateGoryList = ['react', 'next', 'scss', 'css', 'etc'];

    // 입력 파라미터의 존재 여부 확인
    if (category !== 'all' && !validCategories.has(category.toLowerCase())) {
        throw new Error(`없는 카테고리 같네요..: ${category}`);
    }

    if (itemParam && !cateGoryList.includes(itemParam.toLocaleLowerCase())) {
        throw new Error(`없는 카테고리 같네요..: ${itemParam}`);
    }
};

const getBlogPosts = async (data, page, category, itemParam, searchParam) => {
    const { firstIdx, lastIdx } = pageCalculator(page);

    // const filterData = queryStringFilter(data, category, itemParam);
    // const resultData = searchParam ? searchFilter(filterData, searchParam) : filterData;
    return {
        data: resultData.slice(firstIdx, lastIdx),
        paging: Math.ceil(resultData.length / 10),
    };
};

const postInsert = async (conn, body, id) => {
    const { title, category, post, user, key, thumNail, description } = body;
    console.log(body);
    const [mainCategory, subCategory] = category.split(':');

    const sqlGetCategoryId = 'SELECT category_id FROM blog_categories WHERE category_name = ?;';
    const sqlGetSubCategoryId = `SELECT bs.subcategory_id FROM blog_subcategories bs JOIN blog_categories bc ON bs.fk_category_id = bc.category_id WHERE bs.subcategory_name = ? AND bc.category_name = ?;
    `;

    const [[category_id], [subCategory_id]] = await Promise.all([
        conn.query(sqlGetCategoryId, [mainCategory]),
        conn.query(sqlGetSubCategoryId, [subCategory, mainCategory]),
    ]);

    const sql_postMeta = `insert into blog_metadata 
    (post_title , post_description , create_at, create_user , category_id , subcategory_id )  
    values(? , ? , now() , ? , ? , ?)`;

    const [meta_result] = await conn.query(sql_postMeta, [
        title,
        description,
        user.name,
        category_id[0].category_id,
        subCategory_id[0].subcategory_id,
    ]);

    const postId = meta_result.insertId;

    const sql_contents = `
        insert into blog_post (post_id , contents , contents_key ) values(?, ?, ?);
    `;
    await conn.query(sql_contents, [postId, post, key]);

    const sql_thumNail = `
        insert into blog_thumnail (post_id, thumnail_url) values(?, ?);
    `;
    await conn.query(sql_thumNail, [postId, thumNail]);
};

/**
 *
 * @param {d} conn
 * @param {*} body
 * @param {*} postId 포스트 아이디 임 프론트에서 보냈음
 */
const postUpdate = async (conn, body, postId) => {
    const { title, category, post, user, thumNail, description } = body;

    console.log(body);

    const [mainCategory, subCategory] = category.split(':');

    const sqlGetCategoryId = 'SELECT category_id FROM blog_categories WHERE category_name = ?;';
    const sqlGetSubCategoryId = `SELECT bs.subcategory_id FROM blog_subcategories bs JOIN blog_categories bc ON bs.fk_category_id = bc.category_id WHERE bs.subcategory_name = ? AND bc.category_name = ?;
    `;

    const [[category_id], [subCategory_id]] = await Promise.all([
        conn.query(sqlGetCategoryId, [mainCategory]),
        conn.query(sqlGetSubCategoryId, [subCategory, mainCategory]),
    ]);

    const sql_UpdateMeta = `
        UPDATE blog_metadata 
        SET 
            post_title = ? , 
            post_description = ? , 
            update_at = now() , 
            create_user = ? , 
            category_id = ? , 
            subcategory_id = ?
        WHERE 
            post_id = ?`;

    const [meta_result] = await conn.query(sql_UpdateMeta, [
        title,
        description,
        user.name,
        category_id[0].category_id,
        subCategory_id[0].subcategory_id,
        postId,
    ]);

    const sql_contents = `
        update blog_post set 
            contents = ?
        where post_id = ? 
        ;
    `;
    await conn.query(sql_contents, [post, postId]);

    const sql_thumNail = `
        update blog_thumnail set 
        thumnail_url = ? 
        where
            post_id = ?
    `;
    await conn.query(sql_thumNail, [thumNail, postId]);
};

//rending Data
const renderingData = async (conn, req) => {
    const page = parseInt(req.params.page, 10); // 페이지
    const category = req.query.category.toLocaleLowerCase(); //category
    const item = req.query.item === 'null' ? null : req.query.item; // subCategory
    const search = req.query.search === 'null' ? null : req.query.search;

    if (isNaN(page) || page < 1) {
        throw new Error('정상적인 경로가 아닙니다.');
    }

    // 쿼리 파라미터
    const baseParams = [];

    //baseSQL
    let baseQuery = `        
        from 
            blog_metadata bm 
        join 
            blog_thumnail bt on bm.post_id = bt.post_id
        join 
            blog_categories bc on bm.category_id = bc.category_id
        join 
            blog_subcategories bs on bm.subcategory_id = bs.subcategory_id 
        where 
            1=1
    `;

    // 카테고리 필터
    if (category !== 'all') {
        baseQuery += 'AND bc.category_name = ? AND bs.subcategory_name = ?';
        baseParams.push(category, item);
    }

    // 검색 필터
    if (!!search) {
        baseQuery += `AND bm.post_title like ?`;
        baseParams.push(`%${search}%`);
    }

    //처음 + 마지막 인덱스 계산
    const idxCalculator = (curPage, listCnt) => {
        return (curPage - 1) * listCnt;
    };

    const reqSql_getlistCount = `
        select count(*) as cnt ${baseQuery}
    `;
    const reqSql_getPostlist = `
        select 
        bm.post_id as post_id , 
        bm.post_title as post_title , 
        bm.post_description as description , 
        bm.create_at as date , 
        bt.thumnail_url as thumnail ,
        bc.category_name as category ,
        bs.subcategory_name as subcategory
        ${baseQuery}
        ORDER BY post_id DESC limit ? offset ?
    `;

    const limit = 9;
    const offset_idx = idxCalculator(page, limit);

    const [cnt] = await conn.query(reqSql_getlistCount, baseParams);
    const [rows] = await conn.query(reqSql_getPostlist, [...baseParams, limit, offset_idx]);

    // 전체페이지
    const getPaging = (cnt, limit) => {
        const pages = cnt / limit;
        return Math.ceil(pages);
    };

    const paging = getPaging(cnt[0].cnt, limit);

    const result = { data: rows, paging };
    return result;
};

const blogtabService = async (conn) => {
    //arr
    let categoryList = {};
    const [allCount] = await conn.query(`select count(*) as cnt from blog_metadata`);
    categoryList['All'] = allCount[0].cnt;

    let sql = `
                SELECT
                bc.category_name AS category,
                sc.subcategory_name,
                (
                    SELECT COUNT(*)
                    FROM blog_metadata p
                    WHERE p.subcategory_id = sc.subcategory_id
                ) AS post_count,
                (
                    CASE
                        WHEN EXISTS (
                            SELECT 1
                            FROM blog_metadata p
                            WHERE p.subcategory_id = sc.subcategory_id
                            AND p.create_at >= CURRENT_DATE - INTERVAL 2 DAY
                        ) THEN 1
                        ELSE 0
                    END
                ) AS new
            FROM
                blog_categories bc
            LEFT JOIN
                blog_subcategories sc ON bc.category_id = sc.fk_category_id
        `;

    const [response] = await conn.query(sql);

    response.forEach((item) => {
        const { category, subcategory_name, post_count, new: post_new } = item;
        if (!categoryList[category]) {
            categoryList[category] = {};
        }
        categoryList[category][subcategory_name] = {
            post_count,
            post_new: post_new !== 0 ? true : false,
        };
    });

    return categoryList;
};

const getDetail = async (conn, key) => {
    const sql_postDetail = `
            select 
            bm.post_id as post_id ,  
            bm.post_title as post_title,
            bm.create_at as create_date, 
            bm.create_user as user,
            bp.contents as contents,
            bc.category_name as category,
            bs.subcategory_name as subcategory,
            bp.contents_key as imgkey,
            bm.update_at as update_date
            from 
                blog_metadata bm 
            join 
                blog_post bp on bm.post_id = bp.post_id
            join 
                blog_categories bc on bm.category_id = bc.category_id
            join
                blog_subcategories bs on bm.subcategory_id = bs.subcategory_id
            where bm.post_id = ?;
    `;

    const [row] = await conn.query(sql_postDetail, [key]);

    if (row.length === 0) {
        throw new Error('삭제되었거나 없는 게시물입니다.');
    }
    return row[0];
};

module.exports = {
    getBlogPosts,
    postInsert,
    renderingData,
    blogtabService,
    getDetail,
    postUpdate,
};
