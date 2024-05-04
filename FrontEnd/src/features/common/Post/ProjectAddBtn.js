import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from 'hooks/useAuthCheck';

const SeachArea = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    button {
        font-weight: 600;
    }
    .addProjectBtn {
        margin-right: auto;
        font-size: 12px;
    }
`;

export default function ProjectAddBtn() {
    const navigate = useNavigate();
    const { checkHandler } = useAuthCheck();

    const nav = path => {
        if (!checkHandler()) return;
        navigate(path);
    };

    return (
        <SeachArea>
            <button onClick={() => nav(`add`)} className="addProjectBtn">
                + Add Project
            </button>
        </SeachArea>
    );
}
