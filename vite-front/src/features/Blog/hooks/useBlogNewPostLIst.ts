import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchNewPostlist } from 'services/blogService';
import { BlogNewPostListProps } from '@features/Blog/BlogTypes';

const useBlogNewPostList = () => {
    return useQuery<BlogNewPostListProps[]>({
        queryKey: [queryKey.blogNewPostLIst],
        queryFn: fetchNewPostlist,
    });
};

export default useBlogNewPostList;
