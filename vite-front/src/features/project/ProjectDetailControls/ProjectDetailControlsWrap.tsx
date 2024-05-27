import ProjectDeleteBtn from '@features/project/ProjectDetailControls/ProjectDeleteBtn';
import { ProjectKey } from '@type/ProjectTypes';
import styled from 'styled-components';
import { FaListUl } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import ProjectEditBtn from '@features/project/ProjectDetailControls/ProjectEditBtn';

const ButtonArea = styled.div`
    button {
        font-size: 14px;
        font-weight: normal;
        padding: 0.2rem;
        border-radius: 4px;
        margin-left: 5px;
    }
`;

const ProjectDetailControlsWrap: React.FC<{ projectKey: ProjectKey }> = ({
    projectKey,
}) => {
    const navigate = useNavigate();
    return (
        <ButtonArea>
            <button onClick={() => navigate('/project')}>
                <FaListUl />
            </button>

            <ProjectEditBtn projectKey={projectKey} />
            {/* 삭제 */}
            <ProjectDeleteBtn projectKey={projectKey} />
        </ButtonArea>
    );
};

export default ProjectDetailControlsWrap;
