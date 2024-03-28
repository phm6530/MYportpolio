import styled from 'styled-components';
import { IoMdArrowForward } from 'react-icons/io';
import { MdUpload } from 'react-icons/md';

const Type = ({ children, ...props }) => {
    return (
        <button className="btn-borderStyle" {...props}>
            {children}
        </button>
    );
};

const Submit = ({ children, disabled, ...props }) => {
    return (
        <button className="btn-mainSubmit" disabled={disabled} {...props}>
            {children}
            <div className="submit_Icon">
                <IoMdArrowForward />
            </div>
        </button>
    );
};

const Cancle = ({ children, ...props }) => {
    return (
        <button
            className="cancelButton"
            // $page={page}
            {...props}
        >
            {children}
            <div className="submit_Icon">
                <IoMdArrowForward />
            </div>
        </button>
    );
};

const ForsquareBtn = ({ children, ...props }) => {
    return (
        <button className="btn-scheduleControl" {...props}>
            {children}
        </button>
    );
};

const Popup = () => {
    return (
        <button className="btn-popupTrigger">
            Guest Book Wirte
            <img src="/img/board/arrow2.png" alt="arrow_2" />
        </button>
    );
};

const ConfirmButton = ({ children, ...props }) => {
    return (
        <button className="btn-confirm" {...props}>
            {children}
        </button>
    );
};

const UploadButton = ({ children, ...props }) => {
    return (
        <label className="btn-upload" {...props}>
            {children}
            <MdUpload />
        </label>
    );
};

const BtnSubmitStyle = styled.button`
    ${props =>
        props.$active &&
        `            
            background-color: rgba(114, 100, 239, 1);
            color: rgba(255, 255, 255, 1);
        `};
`;

const SubmitButton = ({ children, active, ...props }) => {
    return (
        <BtnSubmitStyle className="btn-submit" $active={active} {...props}>
            {children}
        </BtnSubmitStyle>
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
Button.SubmitButton = SubmitButton;
