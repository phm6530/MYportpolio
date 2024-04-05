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
    margin-bottom: 4rem;
`;

const LeftWrap = styled(Wrap)`
    width: 65%;
    /* border: 1px solid #e9e9e9;
    box-shadow: 7px 7px 12.9px rgba(0, 0, 0, 0.03);
    border-radius: 37px;
    padding: 2rem; */
`;

const RightWrap = styled(Wrap)`
    width: 30%;
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

                <RightWrap>
                    <CardSubtitle
                        title={'Today Commit'}
                        redirectTo={'https://github.com/phm6530/'}
                        buttonText={'git'}
                    />
                    {/* Summary */}
                    <ScheduleGit />
                </RightWrap>
            </FlexRow>

            <FlexRow>
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

                <RightWrap>
                    <CardSubtitle
                        title={'D - Day Schedule'}
                        redirectTo={'/myschedule/Task'}
                        // buttonText={'Task'}
                    />

                    {/* Summary */}
                    <ScheduleDdayList DdayArr={DdayArr} />
                </RightWrap>
            </FlexRow>
        </>
    );
};

export default DashBoardPage;
