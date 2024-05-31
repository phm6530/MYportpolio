import { useParams } from 'react-router-dom';
import useBlogPostRelated from '../hooks/useBlogPostRelated';
import styled from 'styled-components';
import BlogPostRelatedItem from '@features/Blog/BlogPostRelatedList/BlogPostRelatedItem';

const RelatedPostsContainer = styled.div``;

const ListWrapper = styled.div`
    display: flex;
    width: 100%;
    & div:last-child {
        margin-right: 0;
    }
`;

const SubCategory = styled.div`
    margin-bottom: 1rem;
`;

const BlogPostRelatedList = () => {
    const { key: postId } = useParams();
    const { data } = useBlogPostRelated(postId ?? '');

    const relatedList = data || [];

    console.log('랜더');
    return (
        <>
            {relatedList.length !== 0 && (
                <RelatedPostsContainer>
                    <SubCategory>관련 포스트</SubCategory>
                    <ListWrapper>
                        {relatedList.map(item => {
                            const {
                                post_id,
                                post_title,
                                create_at,
                                thumnail_url,
                            } = item;
                            return (
                                <BlogPostRelatedItem
                                    key={item.post_id}
                                    post_id={post_id}
                                    post_title={post_title}
                                    create_at={create_at}
                                    thumnail_url={thumnail_url}
                                />
                            );
                        })}
                    </ListWrapper>
                </RelatedPostsContainer>
            )}
        </>
    );
};

export default BlogPostRelatedList;
