import axios from 'axios';
import { ENDPOINT_URL } from 'constants/apiUrl';
import {
    BlogMainContentsProps,
    BlogPostRelated,
    ApiResData,
} from '@features/Blog/BlogTypes';

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
    console.log(result);
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

const fetchBlogCategory = async () => {
    const response = await fetch('http://localhost:8080/blog/tab');
    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
    }

    const { resData } = await response.json();
    return resData;
};

const blogPostDetail = async key => {
    console.log('key', key);
    try {
        const response = await fetch(`${ENDPOINT_URL}/blog/postdetail/${key}`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteBlogPost = async key => {
    const response = await fetch(`${ENDPOINT_URL}/blog/deletepost/${key}`, {
        method: 'delete',
    });
    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
    }
    const result = await response.json();
    return result;
};

const fetchNewPostlist = async () => {
    try {
        const result = await axios.get(`${ENDPOINT_URL}/blog/posts/newlist`);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
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
