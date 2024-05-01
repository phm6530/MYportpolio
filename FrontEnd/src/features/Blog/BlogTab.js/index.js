import styled from 'styled-components';
import BlogTabDetail from './BlogTabDetail';
import { useEffect, useRef, useState } from 'react';
import useQueryString from '../hooks/useQueryString';

const ListWapper = styled.div`
    overflow: hidden;
    margin-left: 1rem;
    max-height: ${props => (props.$view ? `${props.$height}px` : '0')};
    transition: 0.3s ease;
    border-bottom: 1px solid;
`;

const CateGory = styled.div`
    font-size: 16px;
    padding: 1rem;
`;

const AccodianTab = ({ list, open, category }) => {
    const [view, setView] = useState(open || false);
    const [height, setHeight] = useState(0);
    const { navigateHandler } = useQueryString();
    const ref = useRef();

    const ToggleBtn = category => {
        if (category === 'All') {
            navigateHandler({ category: 'All' });
        }
        setView(prev => !prev);
    };

    useEffect(() => {
        setHeight(ref.current.scrollHeight);
    }, [view]);

    return (
        <>
            <CateGory onClick={() => ToggleBtn(category)}>{category}</CateGory>
            <ListWapper $view={view} ref={ref} $height={height}>
                {Object.keys(list[category]).map((item, idx) => {
                    return (
                        <BlogTabDetail
                            category={category}
                            cnt={list[category][item]}
                            item={item}
                            key={`${item}-${idx}`}
                        />
                    );
                })}
            </ListWapper>
        </>
    );
};

const BlogTab = ({ cateGory }) => {
    return (
        <>
            {Object.keys(cateGory).map((category, idx) => (
                <AccodianTab
                    list={cateGory}
                    category={category}
                    open={idx === 1}
                    key={idx}
                />
            ))}
        </>
    );
};

export default BlogTab;
