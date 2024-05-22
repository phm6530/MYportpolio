import { useQuery } from '@tanstack/react-query';
import { blogPostDetail } from 'services/blogService';
import { queryKey } from 'services/queryKey';

const useBlogPostEdit = postId => {
    const { data } = useQuery({
        queryKey: [queryKey.blogDetail],
        queryFn: () => blogPostDetail(postId),
        enabled: !!postId,
    });

    return { data };
};

export default useBlogPostEdit;
