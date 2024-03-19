import ScheduleTimer from 'features/Myschedule/ScheduleTimer';
import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';

import styled from 'styled-components';
import ScheduleSummary from 'features/Myschedule/ScheduleSummary';
import { SubTitleSchedule } from 'features/Myschedule/component/styles/ScheduleCommonStyles';
import { FlexRow } from 'component/CommonStyle';
import TotalGraph from 'features/Myschedule/component/TotalGraph';
import SummaryHeader from 'features/Myschedule/ScheduleDashBoard/SummaryHeader';

const Wrap = styled.div`
    display: flex;
    margin-bottom: 4rem;
    flex-direction: row;
    flex-wrap: wrap;
`;

const FirstWrap = styled(Wrap)`
    margin-top: 1rem;
`;

const DashBoardPage = props => {
    return (
        <>
            <FirstWrap>
                {/* 타이머 */}
                <ScheduleTimer />
                <ScheduleDashBoard {...props} />
            </FirstWrap>
            <Wrap>
                <SubTitleSchedule>MY Schedule Summary</SubTitleSchedule>
                <SummaryHeader />
                <TotalGraph {...props} />
                <FlexRow>
                    <ScheduleSummary {...props} />
                </FlexRow>
            </Wrap>
            <Wrap>asgf</Wrap>
        </>
    );
};

export default DashBoardPage;
