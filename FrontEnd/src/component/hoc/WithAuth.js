import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import alertThunk from '../../store/alertTrunk';
import { useDispatch } from 'react-redux';
import useAuthRedirect from 'hooks/useAuthRedirect';

export default function WithAuth({ Component, redirectPath }) {
    const isAuth = useSelector(state => state.authSlice); // 클라이언트 인증확인
    useAuthRedirect(redirectPath);

    return isAuth ? <Component /> : null;
}
