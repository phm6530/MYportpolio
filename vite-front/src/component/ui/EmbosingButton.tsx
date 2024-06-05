import { device } from 'config/DeviceConfig';
import React from 'react';
import styled from 'styled-components';

export const EmbosingBtn = styled.button`
    display: inline-flex;
    align-items: center;
    margin-right: 1rem;

    padding: 0.7rem 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    color: #f0f0f0;
    margin-top: 1rem;
    box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 2px 0px inset;
    background: var(--perple);
    span {
        background: linear-gradient(to left, #f0f0f0, #a9a5cc, #8e9bfc);
        color: transparent;
        font-weight: bold;
        background-clip: text;
        display: inline-flex;
        margin: 0 10px;
    }
    img {
        margin-right: 1rem;
    }
    @media ${device.tablet} {
        font-size: 0.8rem;
        img {
            margin-right: 0.3rem;
        }
    }
`;

interface EmbosingButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const EmbosingButton: React.FC<EmbosingButtonProps> = ({
    children,
    ...prop
}) => {
    return <EmbosingBtn {...prop}>{children}</EmbosingBtn>;
};

export default EmbosingButton;
