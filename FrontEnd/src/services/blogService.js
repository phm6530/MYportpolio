import { ENDPOINT_URL } from 'constants/apiUrl';

const blogloadImage = async ({ category, key, formData }) => {
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

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
    return { resData };
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

export {
    blogloadImage,
    blogPostAction,
    fetchBlogCategory,
    blogPostDetail,
    deleteBlogPost,
};
