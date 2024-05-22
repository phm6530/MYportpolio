import axios from 'axios';
const apiClient = axios.create({
    baseURL: `${ENDPOINT_URL}/blog`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10초 타임아웃
});
