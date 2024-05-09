import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';

import QuillView from 'component/editor/QuillView';
import useBlogPostDetail from 'hooks/useBlogPostDetail';
import NotfoundPage from 'component/error/NotfoundPage';

import BlogDetailDeleteBtn from 'features/Blog/BlogDetailControls/BlogDetailDeleteBtn';
import BlogDetailEditBtn from 'features/Blog/BlogDetailControls/BlogDetailEditBtn';
import PostRelatedList from 'features/Blog/PostRelatedList';

import { format } from 'date-fns';

import styled from 'styled-components';

const PostTitle = styled.div`
    font-size: 2rem;
    padding: 1rem 0;
`;
const CateGroy = styled.div`
    opacity: 0.3;
`;
const PostInfo = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .create_at {
        opacity: 0.6;
        display: inline-block;
        margin-left: 0.6rem;
        margin-right: auto;
    }
`;
const ControlBtnWrap = styled.span``;

const UserPictrue = styled.div`
    border-radius: 100%;
    width: 40px;
    overflow: hidden;
    border: 3px solid var(--borer-line-color);
    margin-right: 1rem;
    img {
        width: 100%;
    }
`;

const PostDetailHeader = styled.div`
    border-bottom: 1px solid var(--borer-line-color);
    margin-bottom: 2rem;
    padding-bottom: 1rem;
`;

const PostLastUpdate = styled.div`
    font-size: 13px;
    opacity: 0.6;
    margin-top: 3rem;
    padding-top: 1rem;
    text-align: right;
    border-top: 1px solid var(--borer-line-color);
`;

const QuillViewWrapper = styled.div`
    margin-bottom: 5rem;
`;

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

    const {
        post_title,
        user,
        category,
        subcategory,
        create_date,
        update_date,
    } = data?.resData || {};

    return (
        <>
            {data && (
                <div>
                    <PostDetailHeader>
                        <CateGroy>
                            {category} / {subcategory}
                        </CateGroy>

                        <PostTitle>{post_title}</PostTitle>
                        <PostInfo>
                            <UserPictrue>
                                <img src="/img/me.jpg" alt="" />
                            </UserPictrue>
                            {user}
                            <span className="create_at">
                                {format(create_date, 'yyyy-MM-dd HH:mm:ss')}
                            </span>
                            <ControlBtnWrap>
                                <Button onClick={() => navigate(-1)}>
                                    목록
                                </Button>
                                {/* 수정 */}
                                <BlogDetailEditBtn postId={key} />
                                {/* 삭제 */}
                                <BlogDetailDeleteBtn postKey={key} />
                            </ControlBtnWrap>
                        </PostInfo>
                    </PostDetailHeader>

                    {/* Quill View */}
                    <QuillViewWrapper>
                        <QuillView contents={data?.resData.contents} />
                        {update_date && (
                            <PostLastUpdate>
                                게시물 최근 수정 일{' '}
                                {format(update_date, 'yyyy-MM-dd HH:mm:ss')}
                            </PostLastUpdate>
                        )}
                    </QuillViewWrapper>

                    <PostRelatedList />
                </div>
            )}
        </>
    );
};

export default BlogDetail;
