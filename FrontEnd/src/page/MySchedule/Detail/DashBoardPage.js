import ScheduleTimer from 'features/Myschedule/ScheduleTimer';
import { ContentsWrap, CalendarStyle } from '../MyScheduleStyle';
import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';
import ScheduleContainer from 'features/Myschedule/ScheduleContainer';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';
import styled from 'styled-components';
import { FlexColumnDiv } from 'features/CommonStyles';
import { useEffect, useRef } from 'react';

const Wrap = styled.div`
    display: flex;
    margin-bottom: 4rem;
`;

const DashBoardPage = ({
    setSelectDay,
    listData,
    selectDay,
    paramYear,
    paramMonth,
    DdayArr,
}) => {
    return (
        <>
            <Wrap>
                {/* 타이머 */}
                <ScheduleTimer />
                <ScheduleDashBoard />
            </Wrap>

            {/* D - day  */}
            {/* <ScheduleDdayList DdayTasks={DdayArr} /> */}

            <FlexColumnDiv>
                {/* body */}

                {/* D-day 영역 */}

                <CalendarStyle
                    setSelectDay={setSelectDay}
                    listData={listData}
                    selectDay={selectDay}
                    paramYear={paramYear}
                    paramMonth={paramMonth}
                />

                {/* Schedule Control*/}
                <ScheduleContainer
                    selectDay={selectDay}
                    listData={listData}
                    setSelectDay={setSelectDay}
                />
            </FlexColumnDiv>
        </>
    );
};

export default DashBoardPage;
