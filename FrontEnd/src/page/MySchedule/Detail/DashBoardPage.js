import styled from 'styled-components';
import ScheduleTimer from 'features/Myschedule/ScheduleTimer';
import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';
import ScheduleSummary from 'features/Myschedule/ScheduleSummary';

import TotalGraph from 'features/Myschedule/component/TotalGraph';
import SummaryHeader from 'features/Myschedule/ScheduleDashBoard/SummaryHeader';

import { SubTitleSchedule } from 'features/Myschedule/component/styles/ScheduleCommonStyles';
import { FlexWrapDiv } from 'features/CommonStyles';

import ScheduleDdayList from 'features/Myschedule/ScheduleDday';

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
    const { DdayArr } = props;
    return (
        <>
            <FirstWrap>
                {/* 타이머 */}
                <ScheduleTimer />
                {/* List */}
                <ScheduleDashBoard {...props} />
            </FirstWrap>

            <Wrap>
                <SubTitleSchedule>MY Schedule Summary</SubTitleSchedule>

                {/* Summary */}
                <ScheduleSummary {...props} />
            </Wrap>
            <ScheduleDdayList DdayArr={DdayArr} />
        </>
    );
};

export default DashBoardPage;
