import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchPostRelated } from 'services/blogService';
import { BlogPostRelated } from '@type/BlogTypes';

const useBlogPostRelated = (postId?: string | null) => {
    return useQuery<BlogPostRelated[]>({
        queryKey: [queryKey.blogRelated],
        queryFn: postId
            ? () => fetchPostRelated(postId)
            : () => Promise.resolve([]),
        enabled: !!postId,
        staleTime: 5 * 60 * 1000,
    });
};

export default useBlogPostRelated;
