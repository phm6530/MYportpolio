import { Button } from '@mui/material';
import useCheckpermission from 'hooks/useAuthServer';
import useBlogPostDelete from 'hooks/useBlogPostDelete';
import { toast } from 'react-toastify';
import { useState } from 'react';
import usePopup from 'hooks/usePopup';

const BlogDetailDeleteBtn = ({ postKey }) => {
    const [throttle, setThorttle] = useState(false);
    const checkPermission = useCheckpermission();

    // 삭제커스텀훅
    const { hidePopup, showPopup, PopupComponent } = usePopup();
    const { mutate } = useBlogPostDelete(postKey);

    console.count();

    const deleteHandler = async () => {
        if (throttle) return;
        setThorttle(true);
        setTimeout(() => {
            setThorttle(false);
        }, 1000);

        const authCheck = await checkPermission();

        if (!authCheck) {
            toast.info('권한이 없네요');
            return;
        }

        // 삭제
        mutate();
        hidePopup();
    };

    return (
        <>
            <PopupComponent event={deleteHandler} />
            <Button onClick={() => showPopup('포스팅')}>삭제</Button>
        </>
    );
};

export default BlogDetailDeleteBtn;
