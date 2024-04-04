import styled from 'styled-components';

import ScheduleMainFoucs from './ScheduleMainFoucs';

import { FlexWrapDiv } from 'features/CommonStyles';
import ScheduleTimer from '../ScheduleTimer';
import { useQuery } from '@tanstack/react-query';
import { fetchTimerSetting } from 'services/tastTimerService';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';
import { useState } from 'react';
import { format } from 'date-fns';

const DashBoardStyle = styled.div`
    /* Rectangle 148 */
    width: 40%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 2rem;
    border-radius: 2rem;
`;

// const SubDescriptionStyle = styled.div`
//     font-weight: 500;
//     font-size: 14px;
//     line-height: 1.5rem;
//     color: #7e96a6;
//     margin-bottom: 2.5rem;
// `;
const ConTentsWrapStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CustumFlexWrapDiv = styled(FlexWrapDiv)`
    margin-left: 2rem;
    align-items: flex-start;
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
                <ScheduleMainFoucs
                    timerData={data?.timerData}
                    categoryDailyTotals={data?.categoryDailyTotals}
                />
            </DashBoardStyle>
        </>
    );
};

export default ScheduleDashBoard;
