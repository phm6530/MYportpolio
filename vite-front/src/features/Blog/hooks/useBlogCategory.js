import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchBlogCategory } from 'services/blogService';

const useBlogCategory = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [queryKey.blogCategory],
        queryFn: fetchBlogCategory,
    });

    return { data, isLoading, isError };
};

export default useBlogCategory;
