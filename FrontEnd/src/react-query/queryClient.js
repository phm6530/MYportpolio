import { ReactQuery } from 'lib/lib';
const { QueryClient, QueryCache } = ReactQuery;
import { toast } from 'react-toastify';

// 에러메세지 커스텀했음
const queryErrorHandler = error => {
    toast.error(error.message);
};

// 인스턴스로 전역에러 관리
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            onError: queryErrorHandler,
            refetchOnWindowFocus: false,
        },
        mutations: {
            onError: error => {
                console.log(error);
                // showErrorToast(error.message);
            },
        },
    },
    queryCache: new QueryCache({
        retry: 0,
        onError: queryErrorHandler,
    }),
});
