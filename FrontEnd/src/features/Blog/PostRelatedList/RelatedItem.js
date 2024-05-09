import styled from 'styled-components';
import Thumbnail from 'component/ui/Thumbnail';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    margin-right: 2rem;
    cursor: pointer;
    width: calc(33.333% - 2rem);
`;

const RelatedItem = ({ props }) => {
    const navigate = useNavigate();
    const { post_id, post_title, create_at, thumnail_url } = props;
    return (
        <Container onClick={() => navigate(`/blog/${post_id}`)}>
            <Thumbnail img={thumnail_url} />
            {post_title}
            {create_at}
        </Container>
    );
};

export default RelatedItem;
