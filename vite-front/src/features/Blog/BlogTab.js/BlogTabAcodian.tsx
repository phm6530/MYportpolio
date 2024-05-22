import { LuMinus } from 'react-icons/lu';
import { GoPlus } from 'react-icons/go';
import styled from 'styled-components';
import BlogTabDetail from './BlogTabDetail';
import useQueryString from '../../../hooks/useSearchQueryString';
import { useEffect, useRef, useState } from 'react';
import { BlogCategory } from '@features/Blog/BlogTypes';

const ListWrapper = styled.div<ListWrapperProps>`
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

interface ListWrapperProps {
    $first: boolean;
    $view: boolean;
    $height: number;
}

interface AccodianTabProps {
    list: BlogCategory | number;
    category: string;
    idx: number;
}

const AccodianTab: React.FC<AccodianTabProps> = ({ list, idx, category }) => {
    const [view, setView] = useState<boolean>(true);
    const [height, setHeight] = useState<number>(0);
    const ref = useRef<HTMLInputElement>(null);
    const { navigateHandler } = useQueryString('blog');

    const ToggleBtn = (category: string): void => {
        if (category === 'All') {
            navigateHandler({ category: 'All' });
        }
        setView(prev => !prev);
    };

    // 0번째 idx는 전체 갯수를 보여줘야한다
    const allCnt = idx === 0 && typeof list === 'number' && list;

    // 높이계산
    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.scrollHeight);
        }
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

            {/* 타입가드로 number가 아닐때만 확실하게  */}
            <ListWrapper
                $first={idx === 0}
                $view={view}
                ref={ref}
                $height={height}
            >
                {typeof list !== 'number' && Object.keys(list).length > 0
                    ? Object.keys(list).map((item, idx) => (
                          <BlogTabDetail
                              category={category}
                              item={item}
                              post_count={list[item].post_count}
                              post_new={list[item].post_new}
                              key={`${item}-${idx}`}
                          />
                      ))
                    : null}
            </ListWrapper>
        </>
    );
};

export default AccodianTab;
