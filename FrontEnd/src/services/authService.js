import { json } from 'react-router-dom';
import store, { authAction } from '../store/appSlice';

//로그아웃
const fetchLogout = async token => {
    try {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            // const errorResponse = await response.json();
            throw new Error('에러!');
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message || '서버에 문제가 있습니다.');
    }
};

// 토큰체크
const tokenCheck = async () => {
    store.dispatch(authAction.loading());
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8080/auth`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json(); // 데이터를 JSON 형태로 파싱
        if (!response.ok) {
            console.log(data);
            return json({ Auth: false, message: data.message });
        }
        store.dispatch(authAction.complete());
        console.log('datat ::::', data);
        // data를 사용하거나 반환
        return data;
    } catch (error) {
        // console.error(error.message);
        store.dispatch(authAction.complete());
        return json({ Auth: false });
    }
};

export { tokenCheck, fetchLogout };
