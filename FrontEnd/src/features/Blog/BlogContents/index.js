import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { queryKey } from 'services/queryKey';

const DUMMY_KEY = [
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
];

const fetchData = e => {
    console.log(e);
    return 1;
};

const BlogContents = () => {
    const [param] = useSearchParams();
    const test = param.get('category');

    const { data } = useQuery({
        queryKey: [queryKey.blog, test],
        queryFn: () => fetchData(test),
    });

    return (
        <>
            {DUMMY_KEY.map(item => {
                return <>{item.title}</>;
            })}
        </>
    );
};

export default BlogContents;
