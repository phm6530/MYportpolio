import { LoginResponseProps } from '@type/AuthTypes';
import axios from 'axios';
import { ENDPOINT_URL } from 'constants/apiUrl';
import { requestHandler } from 'utils/apiUtils';

// 로그인
const fetchLogin = async (loginData: {
    user_id: string;
    user_password: string;
}): Promise<LoginResponseProps> => {
    const url = `${ENDPOINT_URL}/login`;
    const result = await requestHandler<LoginResponseProps>(() =>
        axios.post(url, loginData),
    );
    return result;
};

//로그아웃
const fetchLogout = async (token: string) => {
    const url = `${ENDPOINT_URL}/logout`;
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    requestHandler(() => axios.post(url, { headers }));
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
    return response.json();
};

export { tokenCheck, fetchLogout, fetchLogin };
