import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { queryKey } from 'services/queryKey';
import { fetchBlogPageData } from 'services/blogService';

interface item {
    category: string;
    date: Date;
    description: string;
    post_id: number;
    post_title: string;
    subcategory: string;
    thumnail: string;
}

interface BlogResponse {
    message: string;
    resData: item[];
    paging: number;
}

const useBlog = () => {
    const [params] = useSearchParams();

    // 쿼리스트링
    const category: string = params.get('category') || 'All';
    const item: string = params.get('item') || '';
    const page: number = parseInt(params.get('page') || '1');
    const search: string | null = params.get('search') || null;

    // 파라미터 변경시
    const isEnabled = Boolean(item || search || category);

    return useQuery<BlogResponse, Error>({
        queryKey: [queryKey.blog, item, category, page, search],
        queryFn: () => fetchBlogPageData(item, category, page, search),
        staleTime: 5000,
        enabled: isEnabled,
    });
};

export default useBlog;
