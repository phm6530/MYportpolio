const blogTabModel = (conn) => {
    return {
        getAllPostCount: async () => {
            const [allCount] = await conn.query(`select count(*) as cnt from blog_metadata`);
            return allCount[0];
        },
        getPostCategories: async () => {
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
            return response;
        },
    };
};

const blogDetailModel = (conn) => {
    return {
        getDetail: async (key) => {
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

            return row;
        },
    };
};

module.exports = {
    blogTabModel,
    blogDetailModel,
};
