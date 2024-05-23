import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchBlogCategory } from 'services/blogService';
import { BlogCategorylist } from '@type/BlogTypes';

const useBlogCategory = () => {
    return useQuery<BlogCategorylist, Error>({
        queryKey: [queryKey.blogCategory],
        queryFn: fetchBlogCategory,
    });
};

export default useBlogCategory;
