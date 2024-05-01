import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { queryKey } from 'services/queryKey';

const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return DUMMY_KEY;
};

const useBlog = () => {
    const [filter, setFilter] = useState('All');

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

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: [queryKey.blog],
        queryFn: () => fetchData(),
        select: filter !== 'All' ? selectFn : undefined,
        staleTime: 10000,
    });

    return {
        data,
        isLoading,
        isSuccess,
        setFilter,
    };
};

const DUMMY_KEY = [
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'react',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'react',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'react',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'css',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'css',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'scss',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
];

export default useBlog;
