import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { blogPostAction } from 'services/blogService';
import { queryKey } from 'services/queryKey';

const useBlogPostAction = (pageType, postId) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: data => blogPostAction(data, pageType, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKey.blogCategory],
            });
            queryClient.invalidateQueries({ queryKey: [queryKey.blog] });
            toast.success('블로그 글이 포스팅되었습니다.');
            navigate('/blog?category=All');
        },
    });

    return { mutate, isPending };
};

export default useBlogPostAction;
