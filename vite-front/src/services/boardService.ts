import { BoardInfinityResponse } from '@features/Board/BoardTypes';
import axios from 'axios';
import { ENDPOINT_URL } from 'constants/apiUrl';

//추상화
const executeWithHandling = async cb => {
    try {
        const result = await cb();
        return result?.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

async function executeHandling<T>(cb: () => Promise<{ data: T }>): Promise<T> {
    try {
        const { data } = await cb();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('알 수 없는 오류 ');
        }
    }
}

// 초기 데이터 + 페이징
const fetchReply = async (
    page: number | null,
): Promise<BoardInfinityResponse> => {
    const targetIdx = page || 0;
    const Url = `${ENDPOINT_URL}/Board/${targetIdx}`;
    const tes = await executeHandling<BoardInfinityResponse>(() =>
        axios.get(Url),
    );
    console.log(tes);
    return tes;
};

//댓글 삭제로직
const deleteFetch = async (board_key: string) => {
    const token = localStorage.getItem('token');
    const Url = `${ENDPOINT_URL}/board/reply/delete`;

    console.log(board_key);

    const requestFormData = {
        board_key,
        auth: Boolean(token),
    };

    const headers = {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };
    return executeHandling(() => {
        return axios.post(Url, requestFormData, { headers });
    });
};

// reply Submit 로직
const addReply = async formData => {
    const token = localStorage.getItem('token');
    const Url = `${ENDPOINT_URL}/Board/reply${token ? '/auth' : ''}`;

    const headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };

    return executeHandling(() => axios.post(Url, formData, { headers }));
};

export { addReply, fetchReply, deleteFetch };
