import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'react-query/queryClient';
import { toast } from 'react-toastify';
import { deleteFetch } from 'services/boardService';

const useCommentDelete = () => {
    const { mutate } = useMutation({
        mutationFn: formData => deleteFetch(formData),
        onSuccess: () => {
            toast.info('댓글이 삭제되었습니다.');
            queryClient.invalidateQueries({ queryKey: ['board'] });
        },
    });
    return { mutate };
};

export default useCommentDelete;
