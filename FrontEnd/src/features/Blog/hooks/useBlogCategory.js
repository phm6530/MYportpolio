import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';

const fetchBlogCategory = () => {
    const category = {
        All: 111,
        blog: {
            react: 5,
            next: 4,
            css: 2,
            scss: 4,
        },
        code: {
            react: 5,
            next: 4,
            css: 2,
            scss: 4,
        },
        other: {
            react: 5,
            next: 4,
            css: 2,
            scss: 4,
        },
    };

    return { category };
};

const useBlogCategory = () => {
    const { data, isLoading } = useQuery({
        queryKey: [queryKey.blogCategory],
        queryFn: fetchBlogCategory,
    });

    return { data, isLoading };
};

export default useBlogCategory;
