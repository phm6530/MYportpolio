import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const infiniteBgAni = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
transform: scale(1.1);
  }
`;
const opacityAni = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const Background = styled.div<{ $bgImg: string }>`
    background-position: center bottom;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-size: cover;

    ${({ $bgImg }) => {
        return css`
            background-image: url(${$bgImg});
        `;
    }}
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(
            to right,
            rgb(0 0 0 / 66%),
            rgb(40 33 27 / 65%),
            rgb(26 27 32 / 56%)
        );
        background: linear-gradient(
            to right,
            rgb(0 0 0 / 89%),
            rgb(18 9 1 / 73%),
            rgb(26 27 32 / 56%)
        );
        box-shadow: linear-gradient(
            to right,
            rgb(0 0 0 / 72%),
            rgb(60 30 30 / 55%),
            rgb(54 74 107 / 56%)
        );
        box-shadow: linear-gradient(
            to right,
            rgb(0 0 0 / 66%),
            rgb(40 33 27 / 65%),
            rgb(26 27 32 / 56%)
        );
        z-index: 0;
        animation: ${opacityAni} 1.4s ease;
    }

    animation: ${infiniteBgAni} 10s cubic-bezier(0.2, 0.56, 0.38, 0.41) infinite
        forwards alternate;
`;

const BackgroundImgCover: React.FC<{
    imgSrc: string;
    children?: React.ReactNode;
}> = ({ imgSrc, children }) => {
    return <Background $bgImg={imgSrc}>{children}</Background>;
};

export default BackgroundImgCover;
