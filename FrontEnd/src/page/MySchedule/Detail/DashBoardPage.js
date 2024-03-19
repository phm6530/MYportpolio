import ScheduleTimer from 'features/Myschedule/ScheduleTimer';
import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';

import styled from 'styled-components';
import ScheduleSummary from 'features/Myschedule/ScheduleSummary';
import { filterByDate } from 'features/Myschedule/component/filterByOrder';

const Wrap = styled.div`
    display: flex;
    margin-bottom: 4rem;
`;

const FirstWrap = styled(Wrap)`
    margin-top: 1rem;
`;

const DashBoardPage = props => {
    const { listData } = props;

    // today
    const todayArr = filterByDate(listData);

    return (
        <>
            <FirstWrap>
                {/* 타이머 */}
                <ScheduleTimer />
                <ScheduleDashBoard {...props} />
            </FirstWrap>
            <Wrap>
                <ScheduleSummary todayArr={todayArr} />
            </Wrap>
            <Wrap>asgf</Wrap>
        </>
    );
};

export default DashBoardPage;
