import axios from 'axios';
import { ENDPOINT_URL } from 'constants/apiUrl';
import {
    type BlogMainContentsProps,
    type BlogPostRelated,
    type BlogCategorylist,
    type ApiResData,
    type BlogPostDetailProps,
    BlogNewPostListProps,
} from '@style/types/BlogTypes';

async function executeHandler<T>(cb: () => Promise<{ data: T }>): Promise<T> {
    try {
        const { data } = await cb();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('알 수 없는 오류');
        }
    }
}

//카테고리
const fetchBlogCategory = async (): Promise<BlogCategorylist> => {
    const { resData } = await executeHandler<ApiResData<BlogCategorylist>>(
        () => {
            return axios.get(`${ENDPOINT_URL}/blog/tab`);
        },
    );
    return resData;
};

//포스팅 내용
const blogPostDetail = async (key: string): Promise<BlogPostDetailProps> => {
    const { resData } = await executeHandler<ApiResData<BlogPostDetailProps>>(
        () => {
            return axios.get(`${ENDPOINT_URL}/blog/postdetail/${key}`);
        },
    );
    return resData;
};

//관련 포스팅
const fetchPostRelated = async (postId: string): Promise<BlogPostRelated[]> => {
    const { resData } = await executeHandler<ApiResData<BlogPostRelated[]>>(
        () => axios.get(`${ENDPOINT_URL}/blog/posts/${postId}/related`),
    );
    return resData;
};

// 전체 리스트
const fetchBlogPageData = async (
    item: string,
    category: string,
    page: number = 1,
    search: string = '',
): Promise<BlogMainContentsProps> => {
    const queryParams = new URLSearchParams({
        category,
        item,
        search,
    }).toString();

    const url = `${ENDPOINT_URL}/blog/posts/${page}?${queryParams}`;
    const result = await executeHandler<BlogMainContentsProps>(async () =>
        axios.get(url),
    );
    return result;
};

//포스팅 삭제
const deleteBlogPost = async (key: string) => {
    return executeHandler(() =>
        axios.delete(`${ENDPOINT_URL}/blog/deletepost/${key}`),
    );
};

const blogloadImage = async ({ category, key, formData }) => {
    const response = await fetch(
        `${ENDPOINT_URL}/blog/uploadimg/${category}/${key}`,
        {
            method: 'POST',
            body: formData,
        },
    );
    if (!response.ok) {
        throw new Error('이미지가 업로드 되지 않았습니다.');
    }
    const result = await response.json();
    return result;
};

const blogPostAction = async (data, pageType, postId) => {
    //페이지 타입
    const isModify = pageType === 'modify';
    const url = `${ENDPOINT_URL}/blog/${isModify ? `modify/${postId}` : 'post'}`;
    const method = isModify ? 'PATCH' : 'POST';

    const response = await fetch(url, {
        method: method,
        headers: {
            'ConTent-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
};

const fetchNewPostlist = async (): Promise<BlogNewPostListProps[]> => {
    const { resData } = await executeHandler<
        ApiResData<BlogNewPostListProps[]>
    >(() => {
        return axios.get(`${ENDPOINT_URL}/blog/posts/newlist`);
    });

    return resData;
};

export {
    blogloadImage,
    blogPostAction,
    fetchBlogCategory,
    blogPostDetail,
    deleteBlogPost,
    fetchNewPostlist,
    fetchBlogPageData,
    fetchPostRelated,
};
