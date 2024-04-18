import ReactDOM from 'react-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PopupStyle, PopupWrap } from 'component/popup/PopupStyle';
import BackDrop from 'component/popup/Backdrop';

const useModal = () => {
    const [modalShow, setModalShow] = useState(false);
    const [contents, setContents] = useState(null);
    const [animationTrigger, setAnimationTrigger] = useState(false);

    const closePopup = () => {
        setAnimationTrigger(true);
        const timer = setTimeout(() => {
            setAnimationTrigger(false);
            setModalShow(false);
        }, 400);

        return () => clearTimeout(timer);
    };

    const ModalComponent = () => {
        if (!modalShow) return null; //모달 빽

        return (
            <>
                {ReactDOM.createPortal(
                    <BackDrop />,
                    document.getElementById('backdrop-root'),
                )}
                {ReactDOM.createPortal(
                    <PopupStyle>
                        <PopupWrap $close={animationTrigger}>
                            {contents}
                            <button onClick={closePopup} className="close">
                                <span>close</span>
                            </button>
                        </PopupWrap>
                    </PopupStyle>,
                    document.getElementById('modal-root'),
                )}
            </>
        );
    };

    const showModalHandler = component => {
        setModalShow(true);
        setContents(component);
    };

    return {
        showModalHandler,
        ModalComponent,
    };
};

export default useModal;
