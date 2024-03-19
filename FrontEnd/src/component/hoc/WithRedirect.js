import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; // useParams를 사용해 URL 파라미터 접근
import { fetchDetail } from 'services/projectService';
import alertThunk from 'store/alertTrunk';

export default function WithRedirect({ Component, redirectPath }) {
    const { key } = useParams(); // useParam은 라우트 매개변수 읽고 useSeachParam은 쿼리스트링 읽음
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: projectDetail, error } = useQuery(
        ['projectDetail', key],
        () => fetchDetail(key),
        {
            onSuccess: data => {
                console.log('Data: ', data);
            },
            onError: error => {
                console.log('Error: ', error);
                dispatch(alertThunk(error.message, 0));
                navigate(redirectPath);
            },
            retry: false,
        },
    );

    if (error) {
        console.log('Error outside: ', error);
        // 필요한 경우 여기에서도 에러 처리를 할 수 있습니다.
    }

    // projectDetail이 존재하는 경우, 정상적으로 컴포넌트 렌더링
    return projectDetail ? <Component {...projectDetail} /> : null;
}
