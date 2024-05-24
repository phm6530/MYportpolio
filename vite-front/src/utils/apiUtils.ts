import axios from 'axios';

export async function requestHandler<T>(
    cb: () => Promise<{ data: T }>,
): Promise<T> {
    try {
        const { data } = await cb();
        return data;
    } catch (error) {
        //악시오스 에러인지 판별
        if (axios.isAxiosError(error)) {
            // Axios 오류 일 때
            if (error.response) {
                throw new Error(
                    error.response.data.message || '서버 오류 발생',
                );
            } else {
                throw new Error('네트워크 오류 또는 요청 설정 오류');
            }
        } else {
            throw new Error('알 수 없는 오류..');
        }
    }
}
