import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from 'store/appSlice';

const useUserDecoded = () => {
    const isAuth = useSelector(state => state.authSlice);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            return;
        }

        // console.log(jwtDecode(token));
        const { id, role, name } = jwtDecode(token);
        dispatch(authAction.userData({ id, role, name }));
    }, [isAuth, token, dispatch]);
};

export default useUserDecoded;
