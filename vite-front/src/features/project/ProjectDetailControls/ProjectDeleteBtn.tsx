import useCheckpermission from '@hooks/useAuthServer';
import usePopup from '@hooks/usePopup';
import useProjectDelete from '@features/project/hooks/useProjectDelete';

import { ProjectKey } from '@type/ProjectTypes';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Button } from 'component/ui/Button';

const ProjectDeleteBtn: React.FC<{ projectKey: ProjectKey }> = ({
    projectKey,
}) => {
    const { showPopup, PopupComponent, hidePopup } = usePopup();
    const { mutate } = useProjectDelete('project', projectKey);
    const checkPermission = useCheckpermission();

    const authCheck = async () => {
        const authCheck = await checkPermission();
        if (!authCheck) {
            toast.info('권한이 없네요');
            return;
        }
        showPopup('');
    };

    const deleteHandler = async () => {
        mutate();
        hidePopup();
    };

    return (
        <>
            <PopupComponent event={deleteHandler} />
            <Button.Action onClick={authCheck}>삭제</Button.Action>
        </>
    );
};

export default ProjectDeleteBtn;
