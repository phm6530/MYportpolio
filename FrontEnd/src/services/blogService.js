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

const blogPost = async data => {
    const response = await fetch(`${ENDPOINT_URL}/blog/post`, {
        method: 'POST',
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

export { blogloadImage, blogPost, fetchBlogCategory };
