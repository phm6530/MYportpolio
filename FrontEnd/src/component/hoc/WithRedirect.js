import { useDispatch } from 'react-redux';
import { fetchDetail } from 'services/projectService';
import alertThunk from 'store/alertTrunk';
import { ReactQuery, ReactRouteDom } from 'lib/lib';
import { useEffect } from 'react';

const { useNavigate, useParams } = ReactRouteDom;
const { useQuery } = ReactQuery;

export default function WithRedirect({ Component, redirectPath }) {
    const { key } = useParams(); // useParam은 라우트 매개변수 읽고 useSeachParam은 쿼리스트링 읽음
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        isError,
        data: projectDetail,
        error,
        isSuccess,
    } = useQuery({
        queryKey: ['projectDetail', key],
        queryFn: () => fetchDetail(key),
    });

    useEffect(() => {
        if (isSuccess) {
            console.log('성공!');
        }
        if (isError) {
            dispatch(alertThunk(error.message, 0));
            navigate(redirectPath);
        }
    }, [isError, isSuccess]);

    if (error) {
        console.log('Error outside: ', error);
        // 필요한 경우 여기에서도 에러 처리를 할 수 있습니다.
    }

    // projectDetail이 존재하는 경우, 정상적으로 컴포넌트 렌더링
    return projectDetail ? <Component {...projectDetail} /> : null;
}
