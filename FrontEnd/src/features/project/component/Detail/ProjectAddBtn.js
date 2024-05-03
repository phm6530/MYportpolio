import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { v4 as uuidv4 } from 'uuid';

const SeachArea = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    button {
        color: #222;
        font-weight: 600;
    }
    .addProjectBtn {
        margin-right: auto;
        font-size: 12px;
    }
`;

export default function ProjectAddBtn() {
    const location = useLocation();
    const navigate = useNavigate();
    const { checkHandler } = useAuthCheck();

    const nav = path => {
        if (!checkHandler()) return;
        navigate(location.pathname + path);
    };

    return (
        <SeachArea>
            <button
                onClick={() => nav(`/add?key=${uuidv4()}`)}
                className="addProjectBtn"
            >
                + Add Project
            </button>
        </SeachArea>
    );
}
