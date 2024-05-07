import styled from 'styled-components';
import BlogTabDetail from './BlogTabDetail';
import { useEffect, useRef, useState } from 'react';
import useQueryString from '../hooks/useQueryString';
import { LuMinus } from 'react-icons/lu';
import { GoPlus } from 'react-icons/go';
import useBlogCategory from '../hooks/useBlogCategory';

const ListWapper = styled.div`
    overflow: hidden;
    padding-left: 1rem;
    max-height: ${props => (props.$view ? `${props.$height}px` : '0')};
    transition: 0.3s ease;
    border-bottom: 1px solid ${({ theme }) => theme.asdf};
`;

const CateGory = styled.div`
    font-size: 14px;
    padding: 1rem 0;
    display: flex;
    align-items: center;

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

const AccodianTab = ({ list, open, idx, category }) => {
    const [view, setView] = useState(true);
    const [height, setHeight] = useState(0);
    const { navigateHandler } = useQueryString('blog');
    const ref = useRef();

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

            <ListWapper $view={view} ref={ref} $height={height}>
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
            </ListWapper>
        </>
    );
};

const BlogTab = () => {
    const { data, isLoading } = useBlogCategory();
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        console.log('랜더링');
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
                        open={idx === 1}
                        idx={idx}
                        key={idx}
                    />
                ))}
        </>
    );
};

export default BlogTab;
