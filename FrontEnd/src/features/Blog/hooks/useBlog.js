import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { queryKey } from 'services/queryKey';

const fetchData = async (item, category, page = 1) => {
    console.log(page);
    const queryParams = new URLSearchParams({ category, item }).toString();
    const response = await fetch(
        `http://localhost:8080/blog/${page}?${queryParams}`,
    );

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { resData } = await response.json();
    return resData;
};

const useBlog = () => {
    const [filter, setFilter] = useState('All');
    const [params] = useSearchParams();

    // 쿼리스트링
    const category = params.get('category');
    const item = params.get('item');
    const page = params.get('page') || 1;

    const selectFn = useCallback(
        data => {
            if (data) {
                const filtering = data.filter(e => {
                    return e.cateGory === filter;
                });
                console.log(filtering);
                return filtering;
            }
        },
        [filter],
    );

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: [queryKey.blog, item, category, page],
        queryFn: () => fetchData(item, category, page),
        select: filter !== 'All' ? selectFn : undefined,
        staleTime: 10000,
    });

    return {
        data,
        isLoading,
        isSuccess,
        isError,
        setFilter,
    };
};

export default useBlog;
