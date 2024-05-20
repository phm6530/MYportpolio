import { useDispatch } from 'react-redux';
import { authActions } from 'store/appSlice';
import alertThunk from 'store/alertTrunk';
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
            // dispatch(alertThunk('로그아웃 되었습니다.', 1));
        } catch (error) {
            dispatch(alertThunk(error.message, 0));
        }
    };

    return logoutAction;
};

export default useLogout;
