import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useRef } from 'react';

import useCheckpermission from 'hooks/useAuthServer';
import useBlogPostDelete from 'hooks/useBlogPostDelete';
import usePopup from 'hooks/usePopup';

const BlogDetailDeleteBtn = ({ postKey }) => {
    const checkPermission = useCheckpermission();
    const throttle = useRef(false);

    // 삭제커스텀훅
    const { hidePopup, showPopup, PopupComponent } = usePopup();
    const { mutate } = useBlogPostDelete(postKey);

    const deleteHandler = async () => {
        // 삭제
        mutate();
        hidePopup();
    };

    const authCheck = async () => {
        if (throttle.current) return;
        throttle.current = true;

        setTimeout(() => {
            throttle.current = false;
        }, 1000);

        const authCheck = await checkPermission();
        if (!authCheck) {
            toast.info('권한이 없네요');
            return;
        }
        showPopup('포스팅');
    };

    return (
        <>
            <PopupComponent event={deleteHandler} />
            <Button onClick={authCheck}>삭제</Button>
        </>
    );
};

export default BlogDetailDeleteBtn;
