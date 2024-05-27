import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { projectAction } from 'services/projectService';

const useEditorAction = (pageType: string | null) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: data => {
            console.log('data:', data);
            return projectAction(
                pageType === 'edit' ? data : { ...data, idx: projectKey },
                pageType,
            );
        },
        onSuccess: () => {
            toast.success(
                pageType !== 'edit'
                    ? '프로젝트가 등록되었습니다.'
                    : '프로젝트가 수정되었습니다.',
            );
            navigate('/project');
        },
    });
};

export default useEditorAction;
