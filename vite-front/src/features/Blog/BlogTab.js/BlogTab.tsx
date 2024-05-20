import styled from 'styled-components';
import BlogTabDetail from './BlogTabDetail';
import useQueryString from '../hooks/useQueryString';
import useBlogCategory from '../hooks/useBlogCategory';

import { useEffect, useRef, useState } from 'react';
import { LuMinus } from 'react-icons/lu';
import { GoPlus } from 'react-icons/go';

const ListWrapper = styled.div`
    overflow: hidden;
    padding-left: 1rem;
    height: ${props =>
        props.$first ? 'auto' : props.$view ? `${props.$height + 20}px` : '0'};
    transition: 0.3s ease;
    border-bottom: 1px solid var(--borer-line-color);
`;

const CateGory = styled.div`
    font-size: 16px;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    font-weight: bold;
    justify-content: space-between;
`;
const Cnt = styled.span`
    color: ${({ theme }) => theme.tabCnt};
    font-size: 12px;
    margin: 0 15px 0 5px;
`;

const LeftAlign = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    cursor: pointer;
`;

const AccodianTab = ({ list, idx, category }) => {
    const [view, setView] = useState(true);
    const [height, setHeight] = useState(0);
    const { navigateHandler } = useQueryString('blog');
    const ref = useRef<HTMLInputElement>(null);

    const ToggleBtn = category => {
        if (category === 'All') {
            navigateHandler({ category: 'All' });
        }
        setView(prev => !prev);
    };

    const allCnt = idx === 0 && list;

    useEffect(() => {
        setHeight(ref.current.scrollHeight);
    }, [view]);

    return (
        <>
            <CateGory onClick={() => ToggleBtn(category)}>
                {idx === 0 ? (
                    <LeftAlign>
                        {category} <Cnt>( {allCnt} )</Cnt>
                    </LeftAlign>
                ) : (
                    <>{category}</>
                )}
                {idx !== 0 ? !view ? <GoPlus /> : <LuMinus /> : undefined}
            </CateGory>

            <ListWrapper
                $first={idx === 0}
                $view={view}
                ref={ref}
                $height={height}
            >
                {Object.keys(list).map((item, idx) => {
                    return (
                        <BlogTabDetail
                            category={category}
                            item={item}
                            cnt={list[item].post_count}
                            new={list[item].post_new}
                            key={`${item}-${idx}`}
                        />
                    );
                })}
            </ListWrapper>
        </>
    );
};

const BlogTab = () => {
    const { data, isLoading } = useBlogCategory();
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        if (!isLoading) {
            setCategories(data?.resData);
        }
    }, [data, isLoading]);

    return (
        <>
            {categories &&
                Object.keys(categories).map((category, idx) => (
                    <AccodianTab
                        list={categories[category]}
                        category={category}
                        idx={idx}
                        key={idx}
                    />
                ))}
        </>
    );
};

export default BlogTab;
