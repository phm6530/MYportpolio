import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchNewPostlist } from 'services/blogService';

interface BlogPost {
    post_id: number;
    post_title: string;
    post_description: string;
    create_at: Date;
}

interface ApiResponse {
    data: {
        resData: BlogPost[];
    };
}

const useBlogNewPostList = (): UseQueryResult<ApiResponse, Error> => {
    return useQuery({
        queryKey: [queryKey.blogNewPostLIst],
        queryFn: fetchNewPostlist,
    });
};

export default useBlogNewPostList;
