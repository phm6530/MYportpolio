import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { queryKey } from 'services/queryKey';

const fetchData = async (item, category, page = 1, search) => {
    const queryParams = new URLSearchParams({
        category,
        item,
        search,
    }).toString();
    const response = await fetch(
        `http://localhost:8080/blog/${page}?${queryParams}`,
    );

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return response.json();
};

const useBlog = () => {
    // const [filter, setFilter] = useState('All');
    const [params] = useSearchParams();

    // 쿼리스트링
    const category = params.get('category') || 'All';
    const item = params.get('item');
    const page = params.get('page') || 1;

    const search = params.get('search') || null;

    // const selectFn = useCallback(
    //     data => {
    //         if (data) {
    //             console.log(data);
    //             const filtering = data.resData.filter(e => {
    //                 const lowerCaseSearch = search.toLocaleLowerCase();
    //                 return e.title
    //                     .toLocaleLowerCase()
    //                     .includes(lowerCaseSearch);
    //             });
    //             console.log(filtering);
    //             return {
    //                 ...data, // 기존 data 객체의 다른 속성들을 유지
    //                 resData: filtering, // resData만 필터링된 결과로 교체
    //             };
    //         }
    //     },
    //     [search],
    // );

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: [queryKey.blog, item, category, page, search],
        queryFn: () => fetchData(item, category, page, search),
        // select: search ? selectFn : undefined,
        staleTime: 10000,
    });

    return {
        data,
        isLoading,
        isSuccess,
        isError,
    };
};

export default useBlog;
