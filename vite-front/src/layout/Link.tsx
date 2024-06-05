import styled, { css } from 'styled-components';
import { device } from 'config/DeviceConfig';

interface LinkProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    not?: boolean;
}

const LiStyle = styled.li<{ $not?: boolean }>`
    margin-left: 30px;
    padding: 25px 0px;
    font-size: 14px;
    cursor: pointer;
    @media ${device.laptopL} {
        margin-left: 0px;
        ${({ $not }) =>
            !$not &&
            css`
                font-size: 1.4rem;
                width: 100%;
            `}
        font-family: 'Montserrat';
        font-weight: bold;
        padding: 16px 0px;

        &:hover {
            color: #9a18b4;
        }
        transition: color 0.5s ease;
    }
`;

const Link: React.FC<LinkProps> = ({
    children,
    className,
    onClick,
    not,
    ...prop
}) => {
    return (
        <LiStyle $not={not} className={className} onClick={onClick} {...prop}>
            {children}
        </LiStyle>
    );
};

export default Link;
