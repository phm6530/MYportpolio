import { ReactQuery } from 'lib/lib';
const { QueryClient, QueryCache } = ReactQuery;
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const showErrorToast = error => {
    const toastId = 'network-error'; // 모든 네트워크 에러에 대해 고정된 ID 사용

    if (!toast.isActive(toastId)) {
        toast({
            id: toastId,
            title: '네트워크 오류',
            description: error || '네트워크 연결을 확인해주세요.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            onError: error => {
                console.log(error);
            },
        },
        mutations: {
            onError: error => {
                console.log(error);
                showErrorToast(error.message);
            },
        },
    },
    queryCache: new QueryCache({
        onError: error => {
            console.log('에러가떠야함');
            console.log(error.message);
        },
    }),
});
