import { useDispatch } from 'react-redux';
import { authActions } from 'store/appSlice';
import { fetchLogout } from 'services/authService';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const useLogout = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    return useMutation({
        mutationFn: () => {
            if (token !== null) {
                return fetchLogout(token);
            } else {
                return Promise.reject(new Error('No token found'));
            }
        },
        onSuccess: () => {
            dispatch(authActions.logOut());
            localStorage.removeItem('token');
            toast.info('로그아웃 되었습니다');
        },
    });
};

export default useLogout;
