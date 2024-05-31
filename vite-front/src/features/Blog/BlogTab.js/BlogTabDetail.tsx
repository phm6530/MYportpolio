import styled from 'styled-components';
import useQueryString from '../../../hooks/useSearchQueryString';
import { useSearchParams } from 'react-router-dom';
import { BlogCategoryDetail } from '@type/BlogTypes';

const CategoryList = styled.div<{ $select: boolean }>`
    height: 2.4rem;
    font-size: 14px;

    cursor: pointer;
    display: flex;
    align-items: center;
    /* border: 1px solid #354363; */
    padding: 1rem;
    border-radius: 3rem;
    margin: 0.4rem;
    &:hover {
        color: var(--hover-color);
    }
    background: var(--background-category-color);
    ${props => props.$select && `color: #7f8fae`};
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
    display: inline-flex;
    background: rgb(255 99 99);
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

interface BlogTabDetailProps extends BlogCategoryDetail {
    category: string;
    item: string;
}

const BlogTabDetail: React.FC<BlogTabDetailProps> = ({
    category,
    item,
    post_count: cnt,
    post_new: newPost,
}) => {
    const { navigateHandler } = useQueryString('blog');
    const [params] = useSearchParams();

    const itemParams: string | null = params.get('item');
    const categoryParams: string | null = params.get('category');

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

export default BlogTabDetail;
