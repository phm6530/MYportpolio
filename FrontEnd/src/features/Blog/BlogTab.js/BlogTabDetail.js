import styled from 'styled-components';
import useQueryString from '../hooks/useQueryString';
import { useLocation } from 'react-router-dom';

const CategoryList = styled.div`
    margin-left: 1rem;
    height: 2rem;

    cursor: pointer;

    &:hover {
        color: red;
    }
`;

const BlogTablDetail = ({ category, cnt, item }) => {
    const { navigateHandler } = useQueryString('blog');
    return (
        <>
            <CategoryList
                key={item}
                onClick={() =>
                    navigateHandler({
                        category,
                        item,
                    })
                }
            >
                {item} / {cnt}
            </CategoryList>
        </>
    );
};

export default BlogTablDetail;
