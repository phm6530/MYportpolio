import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { tokenCheck } from 'services/authService';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { authAction } from 'store/appSlice';

export default function useAuthRedirect(redirectPath) {
    const isAuth = useSelector(state => state.authSlice.login); // 클라이언트 인증 상태
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isError } = useQuery({
        queryKey: [queryKey.auth],
        queryFn: tokenCheck,
    });

    const deleteLocalToken = () => {
        localStorage.removeItem('token');
    };

    useEffect(() => {
        if (isError || !isAuth) {
            deleteLocalToken();
            navigate(redirectPath);
            dispatch(authAction.logOut());
        }
    }, [isError, isAuth, navigate, redirectPath, dispatch]);
}
