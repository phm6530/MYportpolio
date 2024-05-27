import useCheckPermission from '@hooks/useAuthServer';
import { MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectEditBtn: React.FC<{ projectKey: string }> = ({ projectKey }) => {
    const navigate = useNavigate();
    const checkPermission = useCheckPermission();

    const navEdit = async (projectKey: string) => {
        const authCheck = await checkPermission();
        if (!authCheck) {
            toast.info('권한이 없네요');
            return;
        }
        navigate(`/project/add?type=edit&key=${projectKey}`);
    };

    return (
        <>
            <button onClick={() => navEdit(projectKey)}>
                <MdModeEdit />
            </button>
        </>
    );
};

export default ProjectEditBtn;
