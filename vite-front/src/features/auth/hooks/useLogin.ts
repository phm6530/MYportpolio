import { useMutation } from '@tanstack/react-query';
import { LoginRequestProps, LoginResponseProps } from '@type/AuthTypes';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchLogin } from 'services/authService';
import { authActions } from 'store/appSlice';
import { useAuthStorage } from '@features/auth/useAuthStorage';

const useLogin = () => {
    const dispatch = useDispatch();
    const storageHelper = useAuthStorage();

    // 로그인 로직
    return useMutation<LoginResponseProps, Error, LoginRequestProps>({
        mutationFn: data => fetchLogin(data),
        onSuccess: ({ token }) => {
            // 토큰 저장
            storageHelper.setUserData(token);
            toast.success('로그인 되었습니다.');

            // 로그인 상태 업데이트
            dispatch(authActions.login());
        },
    });
};

export default useLogin;
