import { useQuery } from '@tanstack/react-query';
import { blogPostDetail } from 'services/blogService';
import { queryKey } from 'services/queryKey';

const useBlogPostDetail = key => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [queryKey.blogDetail],
        queryFn: () => blogPostDetail(key),
        enabled: !!key,
    });
    return { data, isLoading, isError };
};

export default useBlogPostDetail;
