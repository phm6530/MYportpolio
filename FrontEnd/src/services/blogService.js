import { ENDPOINT_URL } from 'constants/apiUrl';

const blogloadImage = async (category, key, images) => {
    console.log('category::', category);
    const response = await fetch(
        `${ENDPOINT_URL}/blog/uploadimg/${category}/${key}}`,
        {
            method: 'POST',
            body: images,
        },
    );
    if (!response.ok) {
        throw new Error('이미지가 업로드 되지 않았습니다.');
    }
    const result = await response.json();
    return result;
};

export { blogloadImage };
