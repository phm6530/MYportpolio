import styled from 'styled-components';
import Thumbnail from 'component/ui/Thumbnail';

import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { BlogPostRelated } from '@features/Blog/BlogTypes';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    margin-right: 2rem;
    cursor: pointer;
    width: calc(25% - 2rem);
`;

const Summary = styled.div`
    margin-top: 0.7rem;
    .title {
        font-size: 0.8rem;
    }
    .date {
        font-size: 0.8rem;
        opacity: 0.4;
    }
`;

const ThumbnailCustom = styled(Thumbnail)`
    height: 8.6rem !important;
    border-radius: 2px;
`;

const BlogPostRelatedItem: React.FC<BlogPostRelated> = ({
    post_id,
    post_title,
    create_at,
    thumnail_url,
}) => {
    const navigate = useNavigate();
    return (
        <Container onClick={() => navigate(`/blog/${post_id}`)}>
            <ThumbnailCustom img={thumnail_url} />
            <Summary>
                <div className="title">{post_title}</div>

                <div className="date">{format(create_at, 'yyyy-MM-dd')}</div>
            </Summary>
        </Container>
    );
};

export default BlogPostRelatedItem;
