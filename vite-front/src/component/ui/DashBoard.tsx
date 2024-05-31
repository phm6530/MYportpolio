// import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
// import VideoCanvas from '../common/VideoCanvas';

import { PageBannerGrid } from '@layout/Grid';
import { useLocation } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import DashBoardTitle from './DashBoardTitle';
import ShootingStar from 'component/animations/ShootingStar';

const infiniteBgAni = keyframes`
  0% {
    background-size: 100%;
  }
  100% {
    background-size: 120%;
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

const PageBanner = styled.div<{ $page: string }>`
    width: 100%;
    /* min-width: 1280px; */
    /* height: 100vh; */
    overflow: hidden;
    position: relative;
    z-index: -1;
    background-image: url('/img/main.jpg');
    background-position: center calc(100% + 350px);
    background-size: cover;
    /* position: sticky; */
    top: 0;
    transition: background-position 1s ease;
    animation: ${infiniteBgAni} 10s cubic-bezier(0.2, 0.56, 0.38, 0.41) infinite
        forwards alternate;
`;

const PathStyle = styled.div`
    color: #fff;
    opacity: 0.4;
    display: flex;
    font-size: 0.9rem;
    align-items: center;
    svg {
        margin-right: 1rem;
    }
`;

const PageTest = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    height: 100vh;
    width: 100%;
    opacity: 0;
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
    animation: ${opacityAni} 1s ease-in-out forwards;
`;

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

const PageInfoText = styled.div`
    margin-bottom: 1rem;
    img {
        margin-right: 10px;
    }
    opacity: 0;
    background: linear-gradient(to left, #f0f0f0, #a9a5cc, #8e9bfc);
    color: transparent;
    font-weight: bold;
    background-clip: text;
    display: inline-flex;
    animation: ${animation} 1s 0.6s cubic-bezier(0.1, 0.45, 0, 1.09) forwards;
`;

interface DashBoardProps {
    className?: string;
    pageTitle?: string;
    subComment?: string;
    page?: string;
    children?: React.ReactNode;
}
// const Division = styled.span`
//     color: #6e31e1;
//     font-weight: 400;
//     font-size: 50px;
// `;
const DashBoard: React.FC<DashBoardProps> = ({
    className,
    pageTitle,
    subComment,
    page = '',
    // children,
}) => {
    const { pathname } = useLocation();

    // useEffect(() => {
    //     const target = document.getElementById('parallaxEvent');
    //     const ParallaxHandler = () => {
    //         const ScrollBackgroundPosition = window.scrollY / 60;
    //         if (target) {
    //             target.style.backgroundPositionY = `${ScrollBackgroundPosition}px`;
    //         }
    //     };
    //     window.addEventListener('scroll', ParallaxHandler);
    //     return () => {
    //         window.removeEventListener('scroll', ParallaxHandler);
    //     };
    // }, []);

    return (
        <PageBanner id="parallaxEvent" $page={page} className={className}>
            <ShootingStar />
            <PageTest />
            <PageBannerGrid>
                <DashBoardTitle>
                    {pageTitle}
                    {/* <Division>.me()</Division> */}
                </DashBoardTitle>

                {subComment && (
                    <PageInfoText>
                        <img
                            src="/img/contact/talk2.png"
                            style={{ width: '20px' }}
                        />
                        {subComment}
                    </PageInfoText>
                )}

                <PathStyle>
                    <IoMdHome /> HOME {pathname.replace('/', ' / ')}
                </PathStyle>
            </PageBannerGrid>
        </PageBanner>
    );
};

export default DashBoard;
