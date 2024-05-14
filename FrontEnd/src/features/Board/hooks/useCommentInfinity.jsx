import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchReply } from 'services/boardService';
import { queryKey } from 'services/queryKey';

const useCommentInfinity = () => {
    const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError } =
        useInfiniteQuery({
            queryKey: [queryKey.board],
            queryFn: ({ pageParam = 0 }) => fetchReply(pageParam),
            getNextPageParam: lastPage => {
                return lastPage.nextPage || undefined;
            },
        });
    return { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError };
};

export default useCommentInfinity;
