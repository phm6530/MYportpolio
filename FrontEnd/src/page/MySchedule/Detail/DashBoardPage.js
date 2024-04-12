import styled from 'styled-components';
import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';
import ScheduleSummary from 'features/Myschedule/ScheduleSummary';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';
import { FlexRow } from 'component/CommonStyle';
import { TodaySeletor } from 'utils/TodaySeletor';
import ScheduleGit from 'features/Myschedule/ScheduleDashBoard/ScheduleGit';
import ScheduleList from 'features/Myschedule/ScheduleContainer/ScheduleList';
import CardSubtitle from 'features/Myschedule/component/CardSubtitle';
import ScheduleTimer from 'features/Myschedule/ScheduleTimer';
import {
    FlexColumnDiv,
    SubDescription,
    SubTitle,
    LeftWrap,
    RightWrap,
} from 'features/CommonStyles';

const DashBoardPage = props => {
    const { DdayArr } = props;

    const today = TodaySeletor();

    return (
        <>
            <FlexRow>
                <LeftWrap>
                    <ScheduleTimer />

                    <CardSubtitle
                        title={'D - Day Schedule'}
                        redirectTo={'/myschedule/Task'}
                        // buttonText={'Task'}
                    />

                    {/* Summary */}
                    <ScheduleDdayList DdayArr={DdayArr} />
                </LeftWrap>

                <RightWrap>
                    {/* Summary */}
                    <SubTitle>MY STATUS</SubTitle>
                    <SubDescription>
                        저의 시간과 일정을 기록합니다.
                    </SubDescription>

                    <ScheduleGit />

                    <ScheduleDashBoard />

                    {/* Summary */}
                    <ScheduleSummary {...props} />
                    <CardSubtitle
                        title={'Today Task'}
                        isRedirect={true}
                        redirectTo={'/myschedule/Task'}
                        buttonText={'Task'}
                    />
                    <ScheduleList
                        selectDay={today()}
                        listData={props.listData} //업로드해야할 날짜
                    />
                </RightWrap>
            </FlexRow>
        </>
    );
};

export default DashBoardPage;
