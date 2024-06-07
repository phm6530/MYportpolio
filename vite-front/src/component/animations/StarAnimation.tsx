import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const StartAniWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const transformY = keyframes`
    0%,
    100%{
        transform: translateY(30px);
    }
    50%{
        transform: translateY(0px);
    }
`;

const LightAnimation = keyframes`
    0%,100%{
        opacity: 1;
        
    }
    50%{
        opacity: 0;
        
    } 
`;

interface StartPositionProps {
    $left: number;
    $top: number;
    $duration: number;
}

const StarItem = styled.div.attrs<StartPositionProps>(props => ({
    style: {
        top: `${props.$top}px`,
        left: `${props.$left}px`,
    },
}))<StartPositionProps>`
    width: 3px;
    height: 3px;
    background: #fff;
    position: absolute;
    z-index: 1;
    border-radius: 100%;
    animation: ${transformY} ${props => `${props.$duration + 4}s`} ease infinite;

    &:after {
        filter: blur(10px);
        animation: ${LightAnimation} ${props => `${props.$duration + 4}s`} ease
            infinite;
        padding: 10px;
        display: block;
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff39;
    }
`;

interface offsetProps {
    height: number;
    width: number;
}

const StarAnimation = () => {
    const [offset, setOffset] = useState<offsetProps | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    // 반짝이 갯수 배열
    const starCntArr = [...Array(15)].map((_, idx) => idx + 1);

    useEffect(() => {
        if (ref.current) {
            setOffset({
                height: ref.current.offsetHeight,
                width: ref.current.offsetWidth,
            });
        }
    }, [ref.current]);

    const offsetCalculator = (offset: offsetProps) => {
        return [
            Math.floor(Math.random() * (offset.width + 1)),
            Math.floor(Math.random() * (offset.height + 1)),
        ];
    };

    return (
        <>
            <StartAniWrapper ref={ref}>
                {offset &&
                    starCntArr.map((_, idx) => {
                        const [left, top] = offsetCalculator(offset);
                        const random = Math.floor(Math.random() * 10) + 1;
                        return (
                            <StarItem
                                key={`star_${idx}`}
                                $left={left}
                                $top={top}
                                $duration={random}
                            />
                        );
                    })}
            </StartAniWrapper>
        </>
    );
};

export default StarAnimation;
