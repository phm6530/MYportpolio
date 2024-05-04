import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tokenCheck } from 'services/authService';
import { queryKey } from 'services/queryKey';
import { authAction } from 'store/appSlice';

const withAuth = (Component, redirectPath) => props => {
    // 클라이언트 + 서버 인증확인
    const isAuth = useSelector(state => state.authSlice.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isError } = useQuery({
        queryKey: [queryKey.auth],
        queryFn: tokenCheck,
    });

    useEffect(() => {
        if (!isAuth || isError) {
            localStorage.removeItem('token');
            dispatch(authAction.logOut());
            navigate(redirectPath);
        }
    }, [isError, isAuth, navigate, dispatch]);

    return <Component {...props} />;
};

export default withAuth;
