import { tokenCheck } from 'services/authService';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'store/appSlice';

// 서버 + 클라 체크
const useCheckpermission = () => {
    const { login } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { mutateAsync } = useMutation({
        mutationFn: tokenCheck,
    });

    const permissionHandler = async () => {
        try {
            if (!login) {
                return false;
            }
            const result = await mutateAsync();
            return result;
        } catch (error) {
            // 유효하지 않은 토큰이면 삭제 및 로그아웃 처리
            localStorage.removeItem('token');
            dispatch(authActions.logOut());

            return false; // 에러 발생 시 false 반환
        }
    };

    return permissionHandler;
};
export default useCheckpermission;
