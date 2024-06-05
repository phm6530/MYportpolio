import styled from 'styled-components';
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
    @media ${device.laptopL} {
        ${({ $not }) => !$not && 'font-size: 1.4rem;'}
        font-family: 'Montserrat';
        font-weight: bold;
        padding: 16px 0px;
        width: 100%;
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
