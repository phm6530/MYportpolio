import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
// import VideoCanvas from '../common/VideoCanvas';

import { PageBannerGrid } from './Grid';
import { useLocation } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import DashBoardTitle from './DashBoardTitle';

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
    min-width: 1280px;
    height: 25rem;
    overflow: hidden;
    position: relative;
    z-index: -1;
    background-image: url('/img/8.jpg');
    background-position: center bottom;
    background-size: cover;
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
        rgb(10 14 15 / 75%),
        rgb(20 22 32 / 61%),
        rgb(255 255 255 / 0%)
    );
    animation: ${opacityAni} 1s 0.3s ease-in-out forwards;
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
    margin-bottom: 3rem;
    img {
        margin-right: 10px;
    }
    opacity: 0;
    background: linear-gradient(to left, #64c7ef, #a9a5cc, #8e9bfc);
    color: transparent;
    font-weight: bold;
    background-clip: text;
    display: inline-flex;
    animation: ${animation} 1s 0.6s cubic-bezier(0.1, 0.45, 0, 1.09) forwards;
`;

interface DashBoardProps {
    className?: string;
    pageTitle: string;
    subComment?: string;
    page?: string;
    children?: React.ReactNode;
}

const DashBoard: React.FC<DashBoardProps> = ({
    className,
    pageTitle,
    subComment,
    page = '',
    // children,
}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        const target = document.getElementById('parallaxEvent');
        const ParallaxHandler = () => {
            // Parallax logic here
        };
        if (target) {
            window.addEventListener('scroll', ParallaxHandler);
        }
        return () => {
            if (target) {
                window.removeEventListener('scroll', ParallaxHandler);
            }
        };
    }, [pathname]);

    return (
        <PageBanner id="parallaxEvent" $page={page} className={className}>
            <PageTest />
            <PageBannerGrid>
                <DashBoardTitle>{pageTitle}</DashBoardTitle>

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
                    <IoMdHome /> HOME / {pathname.replace('/', ' / ')}
                </PathStyle>
            </PageBannerGrid>
        </PageBanner>
    );
};

export default DashBoard;
