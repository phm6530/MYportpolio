import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchBlogCategory } from 'services/blogService';
import { type BlogCategoryResponse } from '@features/Blog/BlogTypes';

const useBlogCategory = () => {
    return useQuery<BlogCategoryResponse, Error>({
        queryKey: [queryKey.blogCategory],
        queryFn: fetchBlogCategory,
    });
};

export default useBlogCategory;
