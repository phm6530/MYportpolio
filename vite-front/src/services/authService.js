import store, { authAction } from '../store/appSlice';

// 로그인
const fetchLogin = async formData => {
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'ConTent-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const resultData = await response.json();

    if (!response.ok) {
        throw new Error(resultData.message);
    }

    if (!resultData.Auth || resultData.token === undefined) {
        throw new Error(resultData.message || '서버 오류');
    }
    return resultData;
};

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
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/auth`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
    }
    // store.dispatch(authAction.complete());
    // console.log('datat ::::', data);
    // data를 사용하거나 반환
    return response.json();
};

export { tokenCheck, fetchLogout, fetchLogin };
