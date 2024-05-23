import { BoardInfinityResponse } from 'types/boardTypes';
import axios from 'axios';
import { ENDPOINT_URL } from 'constants/apiUrl';
import { requestHandler } from 'utils/apiUtils';

// 초기 데이터 + 페이징
const fetchReply = async (
    page: number | null,
): Promise<BoardInfinityResponse> => {
    const targetIdx = page || 0;
    const Url = `${ENDPOINT_URL}/Board/${targetIdx}`;
    const tes = await requestHandler<BoardInfinityResponse>(() =>
        axios.get(Url),
    );
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
    return requestHandler(() => axios.post(Url, requestFormData, { headers }));
};

// reply Submit 로직
const addReply = async (formData: object) => {
    const token = localStorage.getItem('token');
    const Url = `${ENDPOINT_URL}/Board/reply${token ? '/auth' : ''}`;

    const headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };

    return requestHandler(() => axios.post(Url, formData, { headers }));
};

export { addReply, fetchReply, deleteFetch };
