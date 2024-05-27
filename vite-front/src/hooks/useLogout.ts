import { useDispatch } from 'react-redux';
import { authActions } from 'store/appSlice';
import { fetchLogout } from 'services/authService';
import { toast } from 'react-toastify';

const useLogout = () => {
    const dispatch = useDispatch();
    const logoutAction = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await fetchLogout(token);
            console.log(result);
            localStorage.removeItem('token');
            dispatch(authActions.logOut());
            toast.info('로그아웃 되었습니다');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return logoutAction;
};

export default useLogout;
