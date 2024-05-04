import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useAuthCheck = () => {
    const { login } = useSelector(state => state.authSlice);
    const throttle = useRef(false);

    const checkHandler = () => {
        if (throttle.current) return;
        throttle.current = true;

        if (!login) {
            toast.warn('권한이 없습니다.');
        }
        setTimeout(() => {
            throttle.current = false;
        }, 1000);

        return login ? true : false;
    };

    return {
        checkHandler,
    };
};

export { useAuthCheck };
