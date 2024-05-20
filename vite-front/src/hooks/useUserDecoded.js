import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'store/appSlice';

const useUserDecoded = () => {
    const isAuth = useSelector(state => state.auth);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            return;
        }

        // console.log(jwtDecode(token));
        const { id, role, name } = jwtDecode(token);
        dispatch(authActions.setUserData({ id, access: role, name }));
    }, [isAuth, token, dispatch]);
};

export default useUserDecoded;
