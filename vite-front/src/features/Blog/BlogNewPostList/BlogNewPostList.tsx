import React from 'react'; // React를 가져오는 것을 잊지 마세요
import useBlogNewPostList from '@features/Blog/hooks/useBlogNewPostLIst'; // 경로의 대소문자 확인
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

// interface 선언은 컴포넌트 함수 외부에 있어야 합니다
interface ListDataType {
    post_id: number;
    post_title: string;
    post_description: string;
    create_at: Date;
}

const BlogNewPostList: React.FC = (): JSX.Element => {
    // 최신글 리스트
    const { data } = useBlogNewPostList();
    const listData: ListDataType[] = data?.data.resData || [];

    // console.log(data);

    return (
        <Container>
            <Title>최신글</Title>
            <div>
                {listData.map(item => (
                    <PostItem
                        key={item.post_id}
                        post_id={item.post_id}
                        post_title={item.post_title}
                        create_at={item.create_at}
                    />
                ))}
            </div>
        </Container>
    );
};

export default BlogNewPostList;
