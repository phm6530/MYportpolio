import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from 'hooks/useAuthCheck';

const PostAddBtn = () => {
    const navigate = useNavigate();
    const { checkHandler } = useAuthCheck();

    const nav = () => {
        if (!checkHandler()) return;
        navigate('add');
    };

    return (
        <>
            <Button
                sx={{
                    borderRadius: '20px',
                    padding: '7px 16px',
                }}
                variant="text"
                size="small"
                onClick={nav}
            >
                글쓰기
            </Button>
        </>
    );
};

export default PostAddBtn;
