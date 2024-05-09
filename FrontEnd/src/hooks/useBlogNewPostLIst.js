import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchNewPostlist } from 'services/blogService';

const useBlogNewPostList = () => {
    const { data } = useQuery({
        queryKey: [queryKey.blogNewPostLIst],
        queryFn: fetchNewPostlist,
    });

    return { data };
};

export default useBlogNewPostList;
