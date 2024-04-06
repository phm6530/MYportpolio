import styled from 'styled-components';

import ScheduleMainFoucs from './ScheduleMainFoucs';

import { FlexWrapDiv, SubDescription } from 'features/CommonStyles';
import ScheduleTimer from '../ScheduleTimer';
import { useQuery } from '@tanstack/react-query';
import { fetchTimerSetting } from 'services/tastTimerService';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';
import { useState } from 'react';
import { format } from 'date-fns';
import { FlexRow } from 'component/CommonStyle';
import { SubTitle } from 'features/CommonStyles';

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

const SelectBox = styled.select`
    border: 1px solid rgba(187, 187, 187, 0.13);
    border-radius: 23px;
    margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    margin-bottom: 1.5rem;
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

    if (isLoading) {
        return <SpinnerLoading />;
    }

    return (
        <>
            <ScheduleTimer timerData={data?.timerData} />

            {/* <button onClick={() => setFilter(prev => !prev)}>!!!!!!</button> */}

            <DashBoardStyle>
                <SubTitle>
                    MY STATE <span>TIMER</span>
                </SubTitle>
                <SubDescription>저의 시간을 기록합니다.</SubDescription>

                {/* <ButtonWrapper>
                    <button className="btn-scheduleControl">ToDay</button>
                    <button className="btn-scheduleControl">ToDay</button>
                </ButtonWrapper> */}

                <ScheduleMainFoucs
                    timerData={data?.timerData}
                    categoryDailyTotals={data?.categoryDailyTotals}
                />
                <ButtonWrapper>
                    <button className="btn-scheduleControl">ToDay</button>
                    <button className="btn-scheduleControl">ToDay</button>
                </ButtonWrapper>
            </DashBoardStyle>
        </>
    );
};

export default ScheduleDashBoard;
