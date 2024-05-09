import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

const ItemWrap = styled.div`
    cursor: pointer;
    font-size: 13px;
    margin-bottom: 0.4rem;
    display: flex;
    flex-direction: column;
    &:hover {
        color: var(--hover-color);
    }
`;

const ItemPostTitle = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;

const ItemPostDate = styled.div`
    opacity: 0.5;
    font-size: 11px;
`;

const PostItem = ({ props }) => {
    const { post_id, post_title, create_at } = props;
    const navigate = useNavigate();

    return (
        <ItemWrap onClick={() => navigate(`${post_id}`)}>
            <ItemPostTitle>{post_title}</ItemPostTitle>
            <ItemPostDate>{format(create_at, 'yyyy-MM-dd')}</ItemPostDate>
        </ItemWrap>
    );
};

export default PostItem;
