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
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutateAsync, isSuccess } = useMutation({
        mutationKey: [type],
        mutationFn: deleteKey => projectDelete(deleteKey),
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: type });
        },
    });
    useEffect(() => {
        if (isSuccess) {
            dispatch(alertThunk('삭제되었습니다.', 1));
            navigate(`/${type}`);
        }
    }, [isSuccess]);

    // const updateHandler = key => {
    //     if (!checkHandle('수정')) {
    //         return;
    //     }
    //     navigate(`/project/add?type=edit&key=${key}`);
    // };

    // const deleteHandler = async deleteKey => {
    //     //권한 확인
    //     if (!checkHandle('삭제')) {
    //         return;
    //     }
    //     setModal(true);
    // };

    return {
        mutateAsync,
        setModal, //
        modal, //
    };
};

export default useProjectActions;
