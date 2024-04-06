import styled from 'styled-components';
import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';
import ScheduleSummary from 'features/Myschedule/ScheduleSummary';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';
import { FlexRow } from 'component/CommonStyle';
import { TodaySeletor } from 'utils/TodaySeletor';
import ScheduleGit from 'features/Myschedule/ScheduleDashBoard/ScheduleGit';
import ScheduleList from 'features/Myschedule/ScheduleContainer/ScheduleList';
import CardSubtitle from 'features/Myschedule/component/CardSubtitle';

const Wrap = styled.div`
    margin-bottom: 2rem;
`;

const LeftWrap = styled(Wrap)`
    width: 65%;
    /* position: absolute; */
    /* width: 631px; */
    /* height: 305px; */
    /* left: 412px; */
    /* top: 489px; */
    box-shadow: 5px -2px 37.5px rgba(0, 0, 0, 0.06);
    border-radius: 36px;
    padding: 1.5rem 3rem;
`;

const RightWrap = styled(Wrap)`
    width: 30%;
    box-shadow: 5px -2px 37.5px rgba(0, 0, 0, 0.06);
    border-radius: 36px;
    padding: 1.5rem 3rem;
`;

const FirstWrap = styled(Wrap)`
    margin-top: 1rem;
    display: flex;
`;

const DashBoardPage = props => {
    const { DdayArr } = props;
    const today = TodaySeletor();
    return (
        <>
            <FirstWrap>
                <ScheduleDashBoard />
            </FirstWrap>

            <FlexRow>
                <RightWrap>
                    <CardSubtitle
                        title={'Today Commit'}
                        redirectTo={'https://github.com/phm6530/'}
                        buttonText={'git'}
                    />
                    {/* Summary */}
                    <ScheduleGit />
                </RightWrap>
                <LeftWrap>
                    <CardSubtitle
                        title={'MY Schedule Summary'}
                        isRedirect={true}
                        redirectTo={'/myschedule/report'}
                        buttonText={'Report'}
                    />
                    {/* Summary */}
                    <ScheduleSummary {...props} />
                </LeftWrap>
            </FlexRow>

            <FlexRow>
                <RightWrap>
                    <CardSubtitle
                        title={'D - Day Schedule'}
                        redirectTo={'/myschedule/Task'}
                        // buttonText={'Task'}
                    />

                    {/* Summary */}
                    <ScheduleDdayList DdayArr={DdayArr} />
                </RightWrap>
                <LeftWrap>
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
                </LeftWrap>
            </FlexRow>
        </>
    );
};

export default DashBoardPage;
