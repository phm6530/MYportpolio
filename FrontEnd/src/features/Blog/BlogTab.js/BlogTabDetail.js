import styled from 'styled-components';
import useQueryString from '../hooks/useQueryString';

const CategoryList = styled.div`
    margin-left: 1rem;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;

const BlogTablDetail = ({ category, cnt, item }) => {
    const { navigateHandler } = useQueryString();
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
