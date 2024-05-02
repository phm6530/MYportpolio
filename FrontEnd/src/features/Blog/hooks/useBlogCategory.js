import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';

const fetchBlogCategory = async () => {
    const response = await fetch('http://localhost:8080/blog/tab');
    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
    }

    const { resData } = await response.json();
    return { resData };
};

const useBlogCategory = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [queryKey.blogCategory],
        queryFn: fetchBlogCategory,
    });

    return { data, isLoading, isError };
};

export default useBlogCategory;
