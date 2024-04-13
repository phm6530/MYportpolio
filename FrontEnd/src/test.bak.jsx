import styled, { keyframes } from 'styled-components';

import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchData } from 'page/Board/BoardFetch';

const Wrap = styled.div`
    padding-top: 150px;
    width: 1200px;
    margin: 0 auto;
    div {
        width: 100%;
        height: 100px;
        background-color: #ffbcbc;
        margin-bottom: 10px;
    }
`;

const Div = styled.div`
    width: 100%;
    height: 100px;
    background: red;
`;

export default function InfiniteScrollTest() {
    const ref = useRef();

    const { data, isLoading, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['test'],
            queryFn: ({ pageParam = 0 }) => fetchData(pageParam),
            getNextPageParam: nextPage => {
                return nextPage.nextPage || undefined;
            },
        });
    console.log(data);

    useEffect(() => {
        const lastRef = ref?.current;
        console.log(lastRef);

        const callback = entry => {
            if (entry[0].isIntersecting) {
                fetchNextPage();
            }
        };

        const io = new IntersectionObserver(callback, { threshold: 0.5 });
        if (lastRef) {
            io.observe(lastRef);
        }

        return () => {
            if (lastRef) {
                io.unobserve(lastRef);
            }
        };
    }, [isLoading, data, fetchNextPage]);

    if (isLoading) {
        return <>loading...</>;
    }

    return (
        <>
            <Wrap>
                {data.pages.map((page, pageIdx) => {
                    const lastPage = pageIdx === data.pages.length - 1;
                    return page.pageData.map((item, idx) => {
                        const lastItem =
                            lastPage && idx === page.pageData.length - 1;

                        return (
                            <Div ref={lastItem ? ref : null} key={idx}>
                                {item.idx}
                            </Div>
                        );
                    });
                })}
            </Wrap>
        </>
    );
}
