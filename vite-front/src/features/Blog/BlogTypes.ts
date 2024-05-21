export interface ApiResData<T> {
    resData: T;
}

// category
export interface BlogCategoryDetail {
    post_count: number;
    post_new: boolean;
}

export interface BlogCategory {
    [subcategory: string]: BlogCategoryDetail;
}

export interface BlogCategoryResponse {
    All: number;
    [category: string]: BlogCategory | number;
}

//blog Summary

type create_at = Date;
type post_id = number;
type post_title = string;
export type thumnail_url = string;

export interface BlogPostRelated {
    create_at: create_at;
    post_id: post_id;
    post_title: post_title;
    thumnail_url: thumnail_url;
}

export interface BlogMainContentsItemProps {
    post_id: post_id;
    date: Date;
    description: string;
    category: string;
    post_title: string;
    subcategory: string;
    thumnail: thumnail_url;
}

export interface BlogMainContentsProps {
    message: string;
    resData: BlogMainContentsItemProps[];
    paging: number;
}
