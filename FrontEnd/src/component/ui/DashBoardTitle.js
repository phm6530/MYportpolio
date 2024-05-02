import styled, { keyframes } from 'styled-components';
import React, { useEffect } from 'react';
const animation = keyframes`
    from{
        opacity: 0;
        transform: translateX(-50px);
    }
    to{
        opacity: 1;
        transform: translateX(0px);
    }
`;

const animationShadow = keyframes`
    from{
        opacity: 0;
        transform: translateX(0px);
    }
    to{
        opacity: .15;
        transform: translateX(50px);
    }
`;
const DashBoardTitleStyle = styled.div`
    background: linear-gradient(to top, #ffffff, #ffffff, #96c1ff);
    /* background: linear-gradient(to left, #7264ef, #7264ef, #dd8efc); */
    color: transparent;
    background-clip: text;
    margin-right: 0.5rem;
    opacity: 0;
    font-family: 'Poppins';
    -webkit-background-clip: text;
    letter-spacing: -4px;
    font-size: 6rem;
    font-weight: bold;
    animation: ${animation} 1s 0.5s cubic-bezier(0.1, 0.45, 0, 1.09) forwards;
`;

const DashBoardShadow = styled.div`
    position: absolute;
    font-size: 6rem;
    z-index: 0;
    font-family: 'Poppins';
    bottom: -25px;
    background: linear-gradient(to top, #ffffff, #a1a1a16e, #000000de);
    left: 10px;
    color: transparent;
    background-clip: text;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.1, 0.45, 0, 1.09);
    animation: ${animationShadow} 1s 0.7s cubic-bezier(0.1, 0.45, 0, 1.09)
        forwards;
`;

// ... 기존의 styled-components 정의 ...

export default function DashBoardTitle({ className, children }) {
    useEffect(() => {
        const parallax = () => {
            const target = document.getElementById('dashboardShadow');
            const ScrollHegiht = (window.scrollY + 75) / 3;
            target.style.bottom = `-${ScrollHegiht}px`;
        };
        document.addEventListener('scroll', parallax);
        return () => {
            document.removeEventListener('scroll', parallax);
        };
    }, []);

    return (
        <>
            <DashBoardShadow id="dashboardShadow" className={className}>
                {children}
            </DashBoardShadow>

            <DashBoardTitleStyle className={className}>
                {children}
            </DashBoardTitleStyle>
        </>
    );
}
