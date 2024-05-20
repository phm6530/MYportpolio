import { useParams } from 'react-router-dom';
import useBlogPostRelated from '../hooks/useBlogPostRelated';
import styled from 'styled-components';
import RelatedItem from './RelatedItem';

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

const PostRelatedList = () => {
    const { key: postId } = useParams();
    const { data } = useBlogPostRelated(postId);

    const relatedList = data?.data.resData || [];

    return (
        <>
            {relatedList.length !== 0 && (
                <RelatedPostsContainer>
                    <SubCategory>관련 포스트</SubCategory>
                    <ListWrapper>
                        {relatedList.map(item => {
                            return (
                                <RelatedItem key={item.post_id} props={item} />
                            );
                        })}
                    </ListWrapper>
                </RelatedPostsContainer>
            )}
        </>
    );
};

export default PostRelatedList;
