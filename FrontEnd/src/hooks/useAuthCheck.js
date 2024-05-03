import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useAuthCheck = () => {
    const { login } = useSelector(state => state.authSlice);
    const [throttle, setThrottle] = useState(false);

    const checkHandler = () => {
        if (throttle) return;
        setThrottle(true);

        if (!login) {
            toast.warn('권한이 없습니다.');
        }
        setTimeout(() => {
            setThrottle(false);
        }, 1000);

        return login ? true : false;
    };

    return {
        checkHandler,
    };
};

export { useAuthCheck };
