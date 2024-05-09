import useBlogNewPostList from 'hooks/useBlogNewPostLIst';
import styled from 'styled-components';
import PostItem from './BlogPostItem';

const Container = styled.div`
    margin-top: 2rem;
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: bold;
    padding: 1rem 0;
`;
const NewPostList = styled.div``;

const BlogNewPostList = () => {
    // 최신글 리스트
    const { data } = useBlogNewPostList();
    const listData = data?.data.resData || [];
    return (
        <Container>
            <Title>최신글</Title>
            <NewPostList>
                {listData.map(item => {
                    return <PostItem key={item.post_id} props={item} />;
                })}
            </NewPostList>
        </Container>
    );
};

export default BlogNewPostList;
