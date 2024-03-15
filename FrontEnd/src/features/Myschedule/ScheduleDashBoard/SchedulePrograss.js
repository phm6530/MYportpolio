import { SubTitleTextStyle } from 'features/CommonStyles';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const getBackgroundColor = persent => {
    if (persent < 30) return 'red';
    else if (persent >= 30 && persent < 60) return 'orange';
    else return 'green';
};

const PrograssbarStyle = styled.div`
    /* Rectangle 161 */
    width: 100%;
    background: #eeeeee;
    height: 1rem;
    border-radius: 1rem;
    position: relative;
    margin-bottom: 3rem;
    .bar {
        border-radius: 1rem;
        height: 0.8rem;
        position: absolute;
        left: 0;
        z-index: 1;
        box-shadow: 15px 10px 10px rgba(0, 0, 0, 0.2);
        width: ${props => `${props.$persent}%`};
        background: linear-gradient(90deg, #7264ef 0%, #b3bee7 100%);
        /* background: ${props => getBackgroundColor(props.$persent)}; */
        transition:
            width 1s ease,
            background-color 1s ease; // 너비와 배경 색상 변경에 대한 트랜지션 적용
    }
    &:after {
        display: block;
        content: '';
        position: absolute;
        border-right: 10px solid #fff;
        left: 0;
        top: 0;
        height: 0.8rem;
        border-radius: 1rem;
        width: ${props => `calc(${props.$persent}% + 2px)`};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        z-index: 0;

        transition:
            width 1s ease,
            background-color 1s ease;
    }
`;
const Prograssbar = props => {
    const [persent, setPersent] = useState(0);
    useEffect(() => {
        setPersent(props.persent);
    }, [persent]);
    return (
        <PrograssbarStyle $persent={persent}>
            <div className="bar"></div>
        </PrograssbarStyle>
    );
};

export default function SchedulePrograss() {
    const persent = 50;

    return (
        <>
            <SubTitleTextStyle>
                'Today's Progress <span>{persent}%</span>
            </SubTitleTextStyle>
            <Prograssbar persent={persent} />
        </>
    );
}
