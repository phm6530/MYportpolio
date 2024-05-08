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
    // await new Promise(resolve => setTimeout(resolve, 1000));
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

    const isEnabled = Boolean(item || search || category);

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: [queryKey.blog, item, category, page, search],
        queryFn: () => fetchData(item, category, page, search),
        // select: search ? selectFn : undefined,
        staleTime: 5000,
        enabled: isEnabled,
    });

    return {
        data,
        isLoading,
        isSuccess,
        isError,
    };
};

export default useBlog;
