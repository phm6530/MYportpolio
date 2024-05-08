import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';

import QuillView from 'component/editor/QuillView';
import useBlogPostDetail from 'hooks/useBlogPostDetail';
import NotfoundPage from 'component/error/NotfoundPage';

import BlogDetailDeleteBtn from 'features/Blog/BlogDetailControls/BlogDetailDeleteBtn';
import BlogDetailEditBtn from 'features/Blog/BlogDetailControls/BlogDetailEditBtn';

const BlogDetail = () => {
    const { key } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useBlogPostDetail(key);

    if (isLoading) {
        return (
            <>
                <SpinnerLoading />
            </>
        );
    }
    if (isError) {
        return (
            <>
                <NotfoundPage redirectPath={'/blog'} />
            </>
        );
    }

    return (
        <>
            {data && (
                <>
                    <Button onClick={() => navigate(-1)}>이전</Button>

                    {/* 수정 */}
                    <BlogDetailEditBtn postId={key} />

                    {/* 삭제 */}
                    <BlogDetailDeleteBtn postKey={key} />

                    {/* Quill View */}
                    <QuillView contents={data?.resData.contents} />
                </>
            )}
        </>
    );
};

export default BlogDetail;
