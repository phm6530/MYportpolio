import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
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

const PreViewButtonStyle = styled.button`
    /* border: 1px solid rgba(0,0,0,0.2); */
    padding: 3px 15px;
    font-size: 12px;
    border-left: 1px solid rgba(0, 0, 0, 0.05);
`;

export default function ProjectAddBtn() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { login } = useSelector(state => state.authSlice);
    const navigate = useNavigate();
    const AuthCheck = text => {
        if (!login) {
            dispatch(alertThunk(`${text} 권한이 없습니다.`), 0);
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

            <button onClick={() => nav(`/add?key=${uuidv4()}`)} className="addProjectBtn">
                + Add Project
            </button>
        </SeachArea>
    );
}
