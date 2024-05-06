import { ENDPOINT_URL } from 'constants/apiUrl';

const blogloadImage = async ({ category, key, formData }) => {
    console.log(formData);

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
    return result;
};

export { blogloadImage };
