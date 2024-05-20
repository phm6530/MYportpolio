import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchPostRelated } from 'services/blogService';

const useBlogPostRelated = postId => {
    const { data } = useQuery({
        queryKey: [queryKey.Related],
        queryFn: () => fetchPostRelated(postId),
        enabled: !!postId,
    });

    return { data };
};

export default useBlogPostRelated;
