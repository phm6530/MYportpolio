import { FlexColumnBetween, SubTitleTextStyle } from 'features/CommonStyles';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
        width: ${props => `${props.$percent}%`};
        background: linear-gradient(90deg, #6284ff 0%, #d35fd6 100%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        transition: width 2s ease;
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
`;

const Graph = props => {
    const [percent, setpercent] = useState(0);
    useEffect(() => {
        setpercent(props.percent);
    }, [props.percent]);
    return (
        <PrograssbarStyle $percent={percent}>
            <div
                className="bar"
                aria-valuenow={percent}
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </PrograssbarStyle>
    );
};

export default function PrograssBar({ tasks }) {
    const completeTask = tasks.filter(e => {
        return e.complete;
    });

    const totalCount = tasks.length;
    const completeCount = completeTask.length;
    const result = Math.floor((completeCount / totalCount) * 100);

    return (
        <FlexColumnBetween>
            <SubTitleTextStyle>
                <span className="categoryTitle">{tasks[0].category}</span>
                {result === 100 && <CompleteStyle>complete</CompleteStyle>}
                <span className="percent">{result}%</span>
            </SubTitleTextStyle>
            <Graph key={result} percent={result} />
        </FlexColumnBetween>
    );
}
