import { useNavigate, useParams } from 'react-router-dom';

import { SpinnerLoading } from 'component/loading/SpinnerLoading';

import QuillView from 'component/editor/QuillView';
import useBlogPostDetail from '@features/Blog/hooks/useBlogPostDetail';
import NotfoundPage from 'component/error/NotfoundPage';

import BlogDetailDeleteBtn from 'features/Blog/BlogDetailControls/BlogDetailDeleteBtn';
import BlogDetailEditBtn from 'features/Blog/BlogDetailControls/BlogDetailEditBtn';
import BlogPostRelatedList from '@features/Blog/BlogPostRelatedList/BlogPostRelatedList';

import styled from 'styled-components';
import PostTimestamp from 'component/ui/PostTimestamp';
import useStore from 'store/zustandStore';
import { device } from 'config/DeviceConfig';
import { Button } from 'component/ui/Button';

const PostTitle = styled.div`
    font-size: 2rem;
    padding: 1rem 0;
    @media ${device.tablet} {
        font-size: 1.5rem;
    }
`;
const CateGroy = styled.div`
    opacity: 0.3;
`;
const PostInfo = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .create_at {
        opacity: 0.6;
        display: inline-block;
        margin-left: 0.6rem;
        margin-right: auto;
    }
    @media ${device.tablet} {
        flex-direction: column;
        align-items: flex-start;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const QuillViewWrapper = styled.div`
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--borer-line-color);
    padding-bottom: 1rem;
`;

const SummaryDataAlign = styled(PostTimestamp)`
    margin-right: auto;
    margin-left: 1rem;
`;

const BlogDetail = () => {
    const { key } = useParams();
    const navigate = useNavigate();
    const login = useStore(state => state.userAuth.login);
    const { data, isLoading, isError } = useBlogPostDetail(key ? key : '');

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
            {data && key && (
                <div style={{ width: '100%' }}>
                    {/* Editor View header */}
                    <PostDetailHeader>
                        <CateGroy>
                            {data.category} / {data.subcategory}
                        </CateGroy>

                        <PostTitle>{data.post_title}</PostTitle>

                        <PostInfo>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <UserPictrue>
                                    <img src="/img/me.jpg" alt="me" />
                                </UserPictrue>
                                {data.user}

                                <SummaryDataAlign date={data.create_date} />
                            </div>
                            <ControlBtnWrap>
                                <Button.Action
                                    onClick={() => navigate('/blog')}
                                >
                                    목록
                                </Button.Action>
                                {login && (
                                    <>
                                        {/* 수정 */}
                                        <BlogDetailEditBtn postId={key} />
                                        {/* 삭제 */}
                                        <BlogDetailDeleteBtn postKey={key} />
                                    </>
                                )}
                            </ControlBtnWrap>
                        </PostInfo>
                    </PostDetailHeader>

                    {/* Quill View */}
                    <QuillViewWrapper>
                        <QuillView contents={data.contents} />
                        {data?.update_date && (
                            <PostTimestamp
                                style={{ marginTop: '5rem', display: 'block' }}
                                message={'게시물 최근 수정 일'}
                                date={data.update_date}
                            />
                        )}
                    </QuillViewWrapper>

                    <BlogPostRelatedList />
                </div>
            )}
        </>
    );
};

export default BlogDetail;
