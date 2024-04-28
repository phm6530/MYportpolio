import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import alertThunk from 'store/alertTrunk';
import styled from 'styled-components';

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
    const { login } = useSelector(state => state.authSlice);
    const navigate = useNavigate();
    const AuthCheck = text => {
        if (!login) {
            toast.warn(`${text} 권한이 없습니다.`);
            return false;
        }
        return true;
    };
    const nav = path => {
        if (!AuthCheck('생성')) {
            return;
        }
        navigate(location.pathname + path);
    };

    // const PreViewButton = ({ children, last, seachContent }) => {
    //     return (
    //         <PreViewButtonStyle
    //             type="button"
    //             onClick={() => navigate(!seachContent ? '/project' : `${location.pathname}?seach=${seachContent}`)}
    //         >
    //             {children}
    //         </PreViewButtonStyle>
    //     );
    // };

    return (
        <SeachArea>
            {/* <PreViewButton>ALL</PreViewButton> */}
            {/* <PreViewButton
                    seachContent='100%'
                >뉴스레터</PreViewButton>
              <PreViewButton
                    seachContent='100%'
                >웹진</PreViewButton> */}
            {/* <PreViewButton last={true} seachContent="개발">
                    참여율 100%
                </PreViewButton> */}

            <button
                onClick={() => nav(`/add?key=${uuidv4()}`)}
                className="addProjectBtn"
            >
                + Add Project
            </button>
        </SeachArea>
    );
}
