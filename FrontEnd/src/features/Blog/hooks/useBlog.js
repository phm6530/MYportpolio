import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { queryKey } from 'services/queryKey';
import { fetchBlogPageData } from 'services/blogService';

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
        queryFn: () => fetchBlogPageData(item, category, page, search),
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
