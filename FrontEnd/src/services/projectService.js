// 초기데이터
const projectFetch = async () => {
    try {
        const response = await fetch('http://localhost:8080/project');

        if (!response.ok) {
            const result = await response.json();
            throw new Error(
                result.message ||
                    `요청이 실패하였습니다. errorCode :  ${response.status}`,
            );
        }
        await new Promise(resolve => setTimeout(resolve, 15000));
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('서버에 문제가 있습니다.');
    }
};

// Detail
const fetchDetail = async key => {
    try {
        const response = await fetch(`http://localhost:8080/project/${key}`);
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Insert or Update하기
const addProjectFetch = async (formData, Type) => {
    console.log(Type);
    try {
        const response = await fetch(
            Type !== 'edit'
                ? 'http://localhost:8080/project/add'
                : `http://localhost:8080/project/editProject`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            },
        );
        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message);
        }

        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// 초기 edit 매핑
const projectEdit = async key => {
    const response = await fetch('http://localhost:8080/project/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || '에러');
    }
    return result;
};

//삭제
const projectDelete = async key => {
    const response = await fetch(
        `http://localhost:8080/project/delete/${key}`,
        {
            method: 'delete',
        },
    );
    if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(
            errorResult.message || '정상적으로 처리 되지 않았습니다.',
        );
    }
    const result = await response.json();
    return result;
};

const uploadImage = async (img, projectKey, imgType) => {
    const response = await fetch(
        `http://localhost:8080/project/imgUploader/${projectKey}?type=${imgType}`,
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

export {
    addProjectFetch,
    projectFetch,
    projectEdit,
    projectDelete,
    uploadImage,
    fetchDetail,
};
