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

// reply Submit 로직
const addReply = async formData => {
    const token = localStorage.getItem('token');
    const Url = `${ENDPOINT_URL}/Board/reply${token ? '/auth' : ''}`;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };

    const result = await executeWithHandling(() =>
        axios.post(Url, formData, { headers }),
    );
    return result;
};

// 초기 데이터 + 페이징
const fetchReply = async page => {
    const targetIdx = page || 0;
    const Url = `${ENDPOINT_URL}/Board/${targetIdx}`;
    const result = await executeWithHandling(() => axios.get(Url));
    return result;
};

//댓글 삭제로직
const deleteFetch = async formData => {
    const token = localStorage.getItem('token');
    const Url = 'http://localhost:8080/board/reply/delete';
    const requestFormData = { ...formData, auth: Boolean(token) };

    const headers = {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };

    const result = await executeWithHandling(() =>
        axios.post(Url, requestFormData, { headers }),
    );
    return result;
};

export { addReply, fetchReply, deleteFetch };
