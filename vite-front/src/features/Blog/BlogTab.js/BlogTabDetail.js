import styled from 'styled-components';
import useQueryString from '../hooks/useQueryString';
import { useSearchParams } from 'react-router-dom';

const CategoryList = styled.div`
    height: 2.4rem;
    font-size: 14px;

    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
        color: var(--hover-color);
    }

    ${props => props.$select && `color: #7f8fae`}
`;

const Cnt = styled.span`
    color: ${({ theme }) => theme.tabCnt};
    font-size: 12px;
    margin: 0 5px 0 2px;
`;

const NewIcon = styled.span`
    width: 12px;
    height: 12px;
    font-size: 0.5rem;
    color: #fff;
    background: red;
    display: inline-flex;
    background: rgb(255 99 99);
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

const BlogTablDetail = ({ category, item, cnt, new: newPost }) => {
    const { navigateHandler } = useQueryString('blog');
    const [params] = useSearchParams();
    const itemParams = params.get('item');
    const categoryParams = params.get('category');

    return (
        <>
            <CategoryList
                $select={categoryParams === category && itemParams === item}
                onClick={() =>
                    navigateHandler({
                        category,
                        item,
                    })
                }
            >
                {item} <Cnt>({cnt})</Cnt> {newPost && <NewIcon>N</NewIcon>}
            </CategoryList>
        </>
    );
};

export default BlogTablDetail;
