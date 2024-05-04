import { useDispatch } from 'react-redux';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { useEffect, useState } from 'react';
import { projectDelete } from 'services/projectService';
import alertThunk from 'store/alertTrunk';
import { ReactQuery, ReactRouteDom } from 'lib/lib';

const { useNavigate } = ReactRouteDom;
const { useQueryClient, useMutation } = ReactQuery;

const useProjectActions = type => {
    const queryClient = useQueryClient();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutateAsync, isSuccess } = useMutation({
        mutationKey: [type],
        mutationFn: deleteKey => projectDelete(deleteKey),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: type });
        },
    });
    useEffect(() => {
        if (isSuccess) {
            dispatch(alertThunk('삭제되었습니다.', 1));
            navigate(`/${type}`);
        }
    }, [isSuccess]);

    return {
        mutateAsync,
    };
};

export default useProjectActions;
