import { tokenCheck } from 'services/authService';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, authActions } from 'store/appSlice';
import { toast } from 'react-toastify';
import { useRef } from 'react';

// 서버 + 클라 체크
const useCheckPermission = () => {
    const { login } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const throttle = useRef<boolean>(false);

    const { mutateAsync } = useMutation({
        mutationFn: tokenCheck,
    });

    const permissionHandler = async () => {
        if (throttle.current) return;
        throttle.current = true;
        try {
            if (!login) {
                toast.error('로그인을 해주세요');
                return false;
            }
            const result = await mutateAsync();
            return result;
        } catch (error) {
            localStorage.removeItem('token');
            dispatch(authActions.logOut());

            return false;
        } finally {
            setTimeout(() => {
                throttle.current = false;
            }, 1000);
        }
    };

    return permissionHandler;
};

export default useCheckPermission;
