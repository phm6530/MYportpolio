import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { queryKey } from 'services/queryKey';
const fetchData = async () => {
    // await new Promise(resolve => setTimeout(resolve, 3000));

    return {
        DUMMY_KEY,
    };
};

const useBlog = () => {
    const [filter, setFIlter] = useState();

    const { data, isLoading } = useQuery({
        queryKey: [queryKey.blog],
        queryFn: () => fetchData(),
    });

    return {
        data,
        isLoading,
    };
};

const DUMMY_KEY = {
    Blog: {
        react: [
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'React',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'React',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'React',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'Css',
            },
        ],
        node: [
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
        ],
        next: [],
        javaSciprt: [],
        Scss: [],
    },

    code: {
        react: [
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'React',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'React',
            },
        ],
        node: [
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
        ],
    },

    other: {
        react: [
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'React',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'React',
            },
        ],
        node: [
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
            {
                id: 'asdfsadf',
                title: 'TEST',
                content: 'testtest',
                thumNail: '',
                cateGory: 'node',
            },
        ],
    },
};

export default useBlog;
