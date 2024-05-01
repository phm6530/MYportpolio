import { useDispatch } from 'react-redux';
import { fetchDetail } from 'services/projectService';
import alertThunk from 'store/alertTrunk';
import { ReactQuery, ReactRouteDom } from 'lib/lib';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import NotfoundPage from 'component/error/NotfoundPage';

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
    }, [isError, isSuccess, dispatch, redirectPath]);

    if (error) {
        console.log('Error outside: ', error);
    }

    return projectDetail ? <Component {...projectDetail} /> : <NotfoundPage />;
}
