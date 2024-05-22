import ReactDOM from 'react-dom';
import React, { useCallback, useEffect, useState } from 'react';

import { PopupWrap, PopupStyle } from './PopupStyle';
import { useSelector } from 'react-redux';

import PopupBackDrop from 'component/popup/PopupBackDrop';
import { RootState } from 'store/appSlice';

interface PopupProps {
    closePopup: () => void;
    type?: string;
    children: React.ReactElement;
}

export default function Popup({ closePopup, type, children }: PopupProps) {
    const [animationState, setAniamtionState] = useState(false);
    const isAuth = useSelector((state: RootState) => state.auth.login);
    // console.log(type);

    // 닫기 & CLose 애니메이션
    const ClosePopup = useCallback(() => {
        setAniamtionState(true);
        setTimeout(() => {
            setAniamtionState(false);
            closePopup();
        }, 400);
    }, [closePopup, setAniamtionState]);

    // console.log('isAuth : ', isAuth);

    useEffect(() => {
        if (isAuth && type === 'Login') {
            ClosePopup();
            return;
        }
    }, [isAuth, ClosePopup, type]);

    return (
        <>
            {ReactDOM.createPortal(
                <PopupBackDrop />,
                document.getElementById('backdrop-root')!,
            )}

            {ReactDOM.createPortal(
                <PopupStyle>
                    <PopupWrap $close={animationState}>
                        {/* children */}
                        {React.cloneElement(children, { ClosePopup }, type)}

                        <button onClick={ClosePopup} className="close">
                            <span>Close</span>
                        </button>
                    </PopupWrap>
                </PopupStyle>,
                document.getElementById('modal-root')!,
            )}
        </>
    );
}
