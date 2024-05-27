import axios from 'axios';
import { requestHandler } from 'utils/apiUtils';
import { ENDPOINT_URL } from 'constants/apiUrl';
import { ProjectDetailProps } from '@type/ProjectTypes';

interface ApiResData<T> {
    resData: T;
}

// Insert or Update하기
export const projectAction = async (formData, Type) => {
    const url = `${ENDPOINT_URL}/project/action?type=${Type === 'edit' ? 'edit' : 'add'}`;
    await requestHandler(() => axios.post(url, formData));
};

// 초기데이터
export const projectFetch = async (): Promise<ProjectDetailProps[]> => {
    const url = `${ENDPOINT_URL}/project`;
    const { resData } = await requestHandler<ApiResData<ProjectDetailProps[]>>(
        () => axios.get(url),
    );
    return resData;
};

// Detail
export const fetchDetail = async key => {
    const response = await fetch(`${ENDPOINT_URL}/project/${key}`);
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
    }
    const result = await response.json();
    return result;
};

// 초기 edit 매핑
export const projectEdit = async (
    projectKey: string,
): Promise<ProjectDetailProps> => {
    const url = `${ENDPOINT_URL}/project/edit/${projectKey}`;
    const { resData } = await requestHandler<ApiResData<ProjectDetailProps>>(
        () => axios.get(url),
    );

    return resData;
};

//삭제
export const projectDelete = async (key: string) => {
    const response = await fetch(`${ENDPOINT_URL}/project/delete/${key}`, {
        method: 'delete',
    });
    if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(
            errorResult.message || '정상적으로 처리 되지 않았습니다.',
        );
    }
    const result = await response.json();
    return result;
};
