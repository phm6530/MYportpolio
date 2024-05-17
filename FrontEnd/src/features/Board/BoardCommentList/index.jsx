import React, { useEffect, useRef, useState } from 'react';
import BoardComment from '../BoardComment';
import styled from 'styled-components';

import FadeinComponent from 'FadeinComponent';
import BoardCommentStatus from '../BoardCommentStatus';
import useCommentInfinity from 'features/Board/hooks/useCommentInfinity';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';
import { format } from 'date-fns';

const FirstDayStyle = styled.div`
    font-size: 1rem;
    letter-spacing: -0.1rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    span {
        font-size: 14px;
        display: inline-block;
        font-weight: normal;
        margin-left: 1rem;
        opacity: 0.7;
    }
    ${props => props.$first && 'margin-top: 0;'}
    &:after {
        content: '';
        flex-grow: 1;
        border-bottom: 1px solid var(--borer-line-color);
        width: 50%;
        margin-left: 2rem;
    }
`;

const BoardReplyWrap = styled.div`
    height: 100%;
    /* background: #9bbbd4; */
    padding: 20px 0;
    &::-webkit-scrollbar {
        width: 4px; /* 스크롤바의 너비 */
    }
    &::-webkit-scrollbar-thumb {
        height: 20%; /* 스크롤바의 길이 */
        background: rgba(0, 0, 0, 0.3); /* 스크롤바의 색상 */
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }
`;

export default function BoardCommentList() {
    const {
        data: infinityData,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isError,
    } = useCommentInfinity();

    const [selectIdx, setSelectIdx] = useState();
    const ref = useRef();
    const dateSet = new Set();
    const testRef = useRef([]);

    const isFirstDate = date => {
        if (!dateSet.has(date)) {
            dateSet.add(date);
            testRef.current.push(date);
            return true;
        }
        return false;
    };

    useEffect(() => {
        const targetItem = ref.current;
        if (!hasNextPage || !targetItem) return;

        const callback = async entry => {
            if (entry[0].isIntersecting) {
                fetchNextPage();
            }
        };

        const io = new IntersectionObserver(callback, {
            threshold: 0.5,
        });
        if (targetItem) {
            io.observe(targetItem);
        }
        return () => io.unobserve(targetItem);
    }, [ref, fetchNextPage, infinityData, hasNextPage]);

    if (isLoading) {
        return (
            <>
                <SpinnerLoading />
            </>
        );
    }

    if (isError) {
        return <>Error</>;
    }

    return (
        <BoardReplyWrap>
            {/* 오늘 댓글 + 전체댓글  */}
            <BoardCommentStatus
                todayReply={infinityData.pages[0].todayReply}
                total={infinityData.pages[0].counter}
            />
            {/* 뿌리기 */}
            {infinityData.pages.map((page, idx) => {
                const lastPage = idx === infinityData.pages.length - 1;

                return page.pageData.map((item, idx) => {
                    const lastItem =
                        lastPage && idx === page.pageData.length - 1;

                    const date = item.date.split(' ')[0];
                    let firstData = isFirstDate(date);

                    const arrayFromSet = Array.from(dateSet);
                    const firstDateDiv = arrayFromSet[0] === date;

                    return (
                        <div key={item.board_key}>
                            {firstData && (
                                <FirstDayStyle $first={firstDateDiv}>
                                    <span>{format(date, 'yyyy. MM. dd')}</span>
                                </FirstDayStyle>
                            )}
                            <FadeinComponent>
                                <BoardComment
                                    ref={lastItem ? ref : null}
                                    item={item}
                                    role={item.role}
                                    selectIdx={selectIdx === item.board_key}
                                    setSelectIdx={setSelectIdx}
                                />
                            </FadeinComponent>
                        </div>
                    );
                });
            })}
        </BoardReplyWrap>
    );
}
