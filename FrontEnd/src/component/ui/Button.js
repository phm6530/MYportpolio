import styled, { css } from 'styled-components';
import { IoMdArrowForward } from 'react-icons/io';

import { MdUpload } from 'react-icons/md';

const ButtonType = styled.button`
    font-size: 12px;
    color: #222;
    /* padding: 5px 10px; */
    display: flex;
    align-items: center;
    padding-bottom: 0.2rem;
    margin-right: 1rem;
    /* border: 1px solid rgb(200, 202, 210); */
    color: rgb(33, 34, 36);
    font-weight: 400;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    svg {
        margin-left: 0.5rem;
    }
    &:hover {
        font-weight: bold;
    }
`;

const ForsquareBtnStyle = styled.button`
    border-radius: 2rem;
    font-size: 14px;
    letter-spacing: -0.5px;
    padding: 2px 15px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    margin-right: 5px;
    &:hover {
        border: 2px solid rgba(255, 255, 255, 0.7);
        box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.1);
    }
    &:active {
        box-shadow: 0px 15px 15px rgba(0, 0, 0, 0);
    }
`;

const PopupOpenButton = styled.div`
    box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    border-radius: 5em;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 30px;
    }
`;
const Type = ({ children, ...props }) => {
    return (
        <ButtonType {...props}>
            {children} <IoMdArrowForward />
        </ButtonType>
    );
};

const CommonStyle = css`
    display: flex;

    border-radius: 5rem;
    cursor: pointer;
    align-items: center;
    font-size: 0.8rem;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.5rem 0.5rem 1.3rem;

    .submit_Icon {
        border-radius: 100%;
        margin: 0.3rem;
        margin-left: 1rem;
        svg {
            font-size: 1.4rem;
            color: #fff;
        }
    }
`;

const ButtonTypeSubmit = styled.button`
    ${CommonStyle}
    background: #000;
    color: #fff;

    box-shadow:
        0 5px 15px 5px rgb(16 16 16 / 14%),
        inset 0 -2px 0 0 rgb(16 16 16 / 36%);
    &:active {
        box-shadow:
            0 5px 15px 5px rgb(16 16 16 / 24%),
            inset 0 -2px 5px 0 rgb(16 16 16 / 56%);
    }
    &:disabled {
        opacity: 0.5;
    }
`;
const ButtonTypeCancle = styled.button`
    ${CommonStyle}
`;

const Submit = ({ children, disabled, ...props }) => {
    return (
        <ButtonTypeSubmit
            // $page={page}
            disabled={disabled}
            {...props}
        >
            {children}
            <div className="submit_Icon">
                <IoMdArrowForward />
            </div>
        </ButtonTypeSubmit>
    );
};

const Cancle = ({ children, ...props }) => {
    return (
        <ButtonTypeCancle
            // $page={page}
            {...props}
        >
            {children}
            <div className="submit_Icon">
                <IoMdArrowForward />
            </div>
        </ButtonTypeCancle>
    );
};

const ForsquareBtn = ({ children, ...props }) => {
    return <ForsquareBtnStyle {...props}>{children}</ForsquareBtnStyle>;
};

const Popup = () => {
    return (
        <PopupOpenButton>
            Guest Book Wirte
            <img src="/img/board/arrow2.png" alt="arrow_2" />
        </PopupOpenButton>
    );
};

const ConfirmButtonStyle = styled.button`
    background: #000;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 3em;
    margin: 0.2rem;
    &:hover {
        background: #282828;
    }
    /* ${props => {
        if (props.$btnType === 'Confirm') {
            return `background: red`;
        }
    }} */
`;

const ConfirmButton = ({ children, type, ...props }) => {
    return (
        <ConfirmButtonStyle $btnType={type} {...props}>
            {children}
        </ConfirmButtonStyle>
    );
};

const UploadButtonStyle = styled.label`
    font-size: 12px;
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 0.3rem 0.4rem;
    border-radius: 2px;
    cursor: pointer;
    &:active {
        background: rgba(0, 0, 0, 0.05);
    }
    svg {
        margin-left: 0.5rem;
    }
`;

const UploadButton = ({ children, ...props }) => {
    return (
        <UploadButtonStyle {...props}>
            {children}
            <MdUpload />
        </UploadButtonStyle>
    );
};

export function Button({ children }) {
    return <button>{children}</button>;
}

Button.Type = Type;
Button.Submit = Submit;
Button.Popup = Popup;
Button.ForsquareBtn = ForsquareBtn;
Button.ConfirmButton = ConfirmButton;
Button.Cancle = Cancle;
Button.UploadButton = UploadButton;
