import { useDispatch } from 'react-redux';
import { authAction } from 'store/appSlice';
import alertThunk from 'store/alertTrunk';
import { fetchLogout } from 'services/authService';

const useLogout = () => {
    const dispatch = useDispatch();
    const logoutAction = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await fetchLogout(token);
            console.log(result);

            localStorage.removeItem('token');
            dispatch(authAction.logOut());
            dispatch(alertThunk('로그아웃 되었습니다.', 1));
        } catch (error) {
            dispatch(alertThunk(error.message, 0));
        }
    };

    return logoutAction;
};

export default useLogout;
