import { FlexColumnBetween, SubTitleTextStyle } from 'features/CommonStyles';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PercentCalculator } from 'utils/Calculator';

import usePrograssbar from 'hooks/usePrograssbar';

const getBackgroundColor = percent => {
    if (percent < 30) return 'red';
    else if (percent >= 30 && percent < 60) return 'orange';
    else return 'green';
};

const PrograssbarStyle = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 1rem;
    position: relative;
    margin-bottom: 1.7rem;
    background: #eeeeee;
    border-radius: 5px;

    .bar {
        border-radius: 1rem;
        height: 10px;
        position: absolute;
        left: 0;
        width: 0;
        z-index: 1;
        /* width: ${props => `${props.$percent}%`}; */
        background: linear-gradient(90deg, #6284ff 0%, #d35fd6 100%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        /* transition: width 2s ease; */
    }
`;

const CompleteStyle = styled.div`
    background: #f67b7b;
    border-radius: 8px;
    display: inline-block;
    padding: 0 0.4rem;
    margin: 0;
    border-radius: 1rem;
    margin-left: 16px;
    margin-right: auto;
    font-size: 10px;
    color: #ffffff;
    opacity: 0;
    transition: opacity 0.5s ease;
    ${props => {
        return props.$active && `opacity: 1`;
    }};
`;

export default function PrograssBar({ tasks }) {
    const { result: percent } = PercentCalculator(tasks);
    const PrograssRef = usePrograssbar(percent);
    // useEffect(() => {
    //     // console.log(ref);
    //     const io = new IntersectionObserver(
    //         entry => {
    //             if (entry[0].isIntersecting) {
    //                 // console.log('발견');
    //             }
    //         },
    //         { threshold: 0.1 },
    //     );
    //     if (ref) {
    //         io.observe(ref.current);
    //     }

    //     return () => {
    //         io.disconnect(ref.current);
    //     };
    // }, []);

    return (
        <FlexColumnBetween>
            <SubTitleTextStyle>
                <span className="categoryTitle">{tasks[0].category}</span>
                <CompleteStyle $active={percent === 100}>
                    complete
                </CompleteStyle>
                <span className="percent">{percent}%</span>
            </SubTitleTextStyle>

            <PrograssbarStyle $percent={percent}>
                <div
                    ref={PrograssRef}
                    className="bar"
                    aria-valuenow={percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </PrograssbarStyle>
        </FlexColumnBetween>
    );
}
