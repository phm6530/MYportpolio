import { ComponentType, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tokenCheck } from 'services/authService';
import { queryKey } from 'services/queryKey';
import { authActions } from 'store/appSlice';
import { RootState } from 'store/appSlice';

// 컴포넌트 props의 타입을 제네릭으로 받을 수 있게 정의
const withAuth = <P extends object>(
    Component: ComponentType<P>,
    redirectPath: string,
) => {
    return (props: P) => {
        const isAuth = useSelector((state: RootState) => state.auth.login);
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const { data, isError } = useQuery({
            queryKey: [queryKey.auth],
            queryFn: tokenCheck,
        });

        useEffect(() => {
            if (!isAuth || isError) {
                localStorage.removeItem('token');
                dispatch(authActions.logOut());
                navigate(redirectPath);
            }
        }, [isAuth, isError, navigate, dispatch]);

        // Component에 props를 그대로 전달
        return data?.Auth ? <Component {...props} /> : null;
    };
};

export default withAuth;
