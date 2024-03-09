import { useQueryClient, useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { projectDelete } from 'services/projectService';
import alertThunk from 'store/alertTrunk';

const useProjectActions = () => {
    const queryClient = useQueryClient();
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { clientAuthCheck } = useAuthCheck();

    //삭제 비동기
    const { mutateAsync } = useMutation(deleteKey => projectDelete(deleteKey), {
        onSuccess: data => {
            console.log(data);
            dispatch(alertThunk('삭제되었습니다.', 1));
            queryClient.invalidateQueries('project');
            navigate('/project');
        },
    });

    const updateHandler = key => {
        if (!clientAuthCheck('수정')) {
            return;
        }
        navigate(`/project/add?type=edit&key=${key}`);
    };

    const deleteHandler = async deleteKey => {
        //권한 확인
        if (!clientAuthCheck('삭제')) {
            return;
        }
        setModal(true);
    };

    return {
        mutateAsync,
        updateHandler,
        deleteHandler, // 삭제
        setModal, //
        modal, //
    };
};

export default useProjectActions;
