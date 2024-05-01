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

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: [queryKey.blog],
        queryFn: () => fetchData(),
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

const DUMMY_KEY = [
    {
        id: 'asdfsadf1',
        title: '데이터베이스 구축',
        content: `DDL - 데이터베이스의 구조와 제약 조건의 정의 (Create , Alter , Drop)
        DML - 데이터베이스의 읽고 쓰고 조작에 사용 되는 언어 (Insert , update , delete , select)
        DCL - 보안, 권한 등 무결성 병행 제어를 위한 언어 (REVOKE 권한철회 , GRANT 권한부여)`,
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf2',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf3',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'react',
        date: '2024. 05. 01',
    },
    {
        id: 'asdfsadf4',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'css',
    },
    {
        id: 'asdfsadf5',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'css',
    },
    {
        id: 'asdfsad6f',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'scss',
    },
    {
        id: 'asdfsad7f',
        title: 'TEST',
        content: 'testtest',
        thumbNail:
            'http://localhost:8080/project/uploads/83e09df3-d616-40c1-a275-ee43f9a4ea9c/83e09df3-d616-40c1-a275-ee43f9a4ea9c_20240419140334.jpg',
        cateGory: 'node',
    },
    {
        id: 'asdfsadf8',
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
