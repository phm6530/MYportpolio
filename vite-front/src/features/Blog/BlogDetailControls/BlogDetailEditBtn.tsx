import { Button } from '@mui/material';
import { useAuthCheck } from 'hooks/useAuthCheck';
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @param {string} post - The HTML content of the blog post.
 */

const BlogDetailEditBtn: React.FC<{ postId: string }> = ({ postId }) => {
    const navigate = useNavigate();
    const { checkHandler } = useAuthCheck();

    const EditCheckHandler = (key: string) => {
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
