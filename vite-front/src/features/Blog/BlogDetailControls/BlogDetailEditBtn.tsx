import { Button } from '@mui/material';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { useNavigate } from 'react-router-dom';

/**
 * @param {string} post - The HTML content of the blog post.
 */

const BlogDetailEditBtn = ({ postId }) => {
    const navigate = useNavigate();
    const { checkHandler } = useAuthCheck();

    const EditCheckHandler = key => {
        if (!checkHandler()) return;
        navigate(`/blog/add?type=modify&post=${key}`);
    };

    return (
        <>
            <Button onClick={() => EditCheckHandler(postId)}>수정</Button>
        </>
    );
};

export default BlogDetailEditBtn;
