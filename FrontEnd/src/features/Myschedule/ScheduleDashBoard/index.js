import styled from 'styled-components';

import ScheduleMainFoucs from './ScheduleMainFoucs';

import { FlexWrapDiv } from 'features/CommonStyles';
import ScheduleTimer from '../ScheduleTimer';
import { useQuery } from '@tanstack/react-query';
import { fetchTimerSetting } from 'services/tastTimerService';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';
import { useState } from 'react';
import { format } from 'date-fns';
import { FlexRow } from 'component/CommonStyle';

const DashBoardStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 2rem;
    border-radius: 2rem;
    justify-content: center;
    margin-left: 5rem;
    align-items: flex-start;
`;

const TimerTitle = styled.div`
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    color: #6251c7;
    letter-spacing: -0.3px;
    margin-bottom: 2rem;
`;

const SelectBox = styled.select`
    border: 1px solid rgba(187, 187, 187, 0.13);
    border-radius: 23px;
    margin-bottom: 1rem;
`;

const ScheduleDashBoard = () => {
    const [filter, setFilter] = useState(false);

    // utc 정시구하기
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    console.log(todayMidnight.toISOString());

    // const test = data => {
    //     if (!filter) return data;
    //     console.log(data.categoryDailyTotals);
    // };

    // const krDate = new Date(`${year}-${month}-${day}T00:00:00+09:00`);
    // const utcDate = krDate.toISOString();
    const { data, isLoading } = useQuery({
        queryKey: ['ScheduleTimer'],
        queryFn: fetchTimerSetting,
        refetchOnWindowFocus: false,
        // select: data => test(data),
    });

    console.log(data);

    if (isLoading) {
        return <SpinnerLoading />;
    }

    return (
        <>
            <ScheduleTimer timerData={data?.timerData} />

            {/* <button onClick={() => setFilter(prev => !prev)}>!!!!!!</button> */}

            <DashBoardStyle>
                <span>저의 시간을 기록합니다.</span>
                <TimerTitle>
                    My State <span>Timer</span>
                </TimerTitle>
                <SelectBox>
                    <option value="asdf">Today</option>
                    <option value="asdf">asdf</option>
                </SelectBox>
                <ScheduleMainFoucs
                    timerData={data?.timerData}
                    categoryDailyTotals={data?.categoryDailyTotals}
                />
            </DashBoardStyle>
        </>
    );
};

export default ScheduleDashBoard;
