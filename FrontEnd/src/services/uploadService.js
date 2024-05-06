const uploadImage = async (img, projectKey) => {
    const response = await fetch(
        `http://localhost:8080/project/imgUploader/${projectKey}`,
        {
            method: 'POST',
            body: img,
        },
    );
    if (!response.ok) {
        throw new Error('이미지가 업로드 되지 않았습니다.');
    }
    const result = await response.json();
    return result;
};

export { uploadImage };