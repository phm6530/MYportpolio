import styled from 'styled-components';
import { IoMdArrowForward } from 'react-icons/io';
import { MdUpload } from 'react-icons/md';

interface ButtonProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
    disabled?: boolean;
}

const Type = ({ children, ...props }) => {
    return (
        <button className="btn-borderStyle" {...props}>
            {children}
        </button>
    );
};

const Submit: React.FC<ButtonProps> = ({ children, disabled, ...props }) => {
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

const UploadBtn = styled.label`
    font-size: 14px;
    display: flex;
    align-items: center;
    border: 1px solid var(--color-lightBlue);
    color: var(--color-lightBlue);
    padding: 0.5rem 0.7rem;
    border-radius: 5px;
    cursor: pointer;
    &:active {
        background: #304149;
    }
    & svg {
        margin-left: 0.5rem;
    }
`;

const UploadButton = ({ children, ...props }) => {
    return (
        <UploadBtn {...props}>
            {children}
            <MdUpload />
        </UploadBtn>
    );
};

const BtnSubmitStyle = styled.button`
    ${props =>
        props.$active &&
        `            
            background-color: #8B6EF2;
            color: rgba(255, 255, 255, 1);
    `};
    border: 1px solid var(--borer-line-color);
`;

const SubmitButton = ({ children, active, ...props }) => {
    return (
        <BtnSubmitStyle className="btn-submit" $active={active} {...props}>
            {children}
        </BtnSubmitStyle>
    );
};

export function Button({ children }: ButtonProps) {
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
