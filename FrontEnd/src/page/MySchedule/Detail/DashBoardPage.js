import styled from 'styled-components';
import ScheduleTimer from 'features/Myschedule/ScheduleTimer';
import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';
import ScheduleSummary from 'features/Myschedule/ScheduleSummary';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { SubTitleSchedule } from 'features/Myschedule/component/styles/ScheduleCommonStyles';
import { FaPlus } from 'react-icons/fa6';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';
import { ReactRouteDom } from 'lib/lib';
import { FlexRow } from 'component/CommonStyle';
import ScheduleGit from 'features/Myschedule/ScheduleDashBoard/ScheduleGit';
import ScheduleContainer from 'features/Myschedule/ScheduleContainer';
import ScheduleList from 'features/Myschedule/ScheduleContainer/ScheduleList';
import { Heading } from '@chakra-ui/react';
import { TodaySeletor } from 'utils/TodaySeletor';
const { useNavigate } = ReactRouteDom;
const Wrap = styled.div`
    margin-bottom: 5rem;
`;

const More = styled.div`
    width: 17px;
    height: 17px;
    margin-left: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(241 245 250);
    svg {
        font-size: 10px;
        color: rgb(98 99 121);
    }
`;

const GraphWrap = styled(Wrap)`
    width: 60%;
    /* margin-right: 5rem; */
`;

const GitWrap = styled(Wrap)`
    width: 30%;
`;

const FirstWrap = styled(Wrap)`
    margin-top: 1rem;
    display: flex;
`;

const MarginLeft = styled.div`
    margin-left: auto;
`;

const Link = styled.div`
    display: inline-flex;
    align-items: center;
    color: rgb(99 104 129);
    font-size: 12px;
    cursor: pointer;
    font-weight: normal;
`;
const DashBoardPage = props => {
    const { DdayArr } = props;
    const navigate = useNavigate();
    const today = TodaySeletor();
    return (
        <>
            <FirstWrap>
                {/* 타이머 */}
                <ScheduleTimer />
                {/* List */}
                <ScheduleDashBoard {...props} />
            </FirstWrap>
            <FlexRow>
                <GraphWrap>
                    <SubTitleSchedule>
                        <Heading fontSize={'14px'}>
                            {' '}
                            MY Schedule Summary
                        </Heading>

                        <MarginLeft>
                            <Link
                                onClick={() => navigate('/myschedule/report')}
                            >
                                Report{' '}
                                <More>
                                    <FaPlus />
                                </More>
                            </Link>
                        </MarginLeft>
                    </SubTitleSchedule>

                    {/* Summary */}
                    <ScheduleSummary {...props} />
                </GraphWrap>

                <GitWrap>
                    <SubTitleSchedule>
                        <Heading fontSize={'14px'}> Today Commit</Heading>
                        <MarginLeft>
                            <Link
                                onClick={() =>
                                    window.open(
                                        'https://github.com/phm6530/',
                                        '_blank',
                                    )
                                }
                            >
                                <More>
                                    <FaPlus />
                                </More>
                            </Link>
                        </MarginLeft>
                    </SubTitleSchedule>

                    {/* Summary */}
                    <ScheduleGit />
                </GitWrap>
            </FlexRow>
            <FlexRow>
                <GraphWrap>
                    <SubTitleSchedule>
                        <Heading fontSize={'14px'}>Today Task</Heading>
                        <MarginLeft>
                            <Link onClick={() => navigate('/myschedule/Task')}>
                                Task
                                <More>
                                    <FaPlus />
                                </More>
                            </Link>
                        </MarginLeft>
                    </SubTitleSchedule>

                    {/* Summary */}
                    {/* <ScheduleSummary {...props} /> */}

                    <ScheduleList
                        selectDay={today()}
                        listData={props.listData} //업로드해야할 날짜
                    />
                </GraphWrap>

                <GitWrap>
                    <SubTitleSchedule>
                        <Heading fontSize={'14px'}>D - Day Schedule</Heading>
                        <MarginLeft>
                            <Link
                                onClick={() =>
                                    window.open(
                                        'https://github.com/phm6530/',
                                        '_blank',
                                    )
                                }
                            >
                                <More>
                                    <FaPlus />
                                </More>
                            </Link>
                        </MarginLeft>
                    </SubTitleSchedule>

                    {/* Summary */}
                    <ScheduleDdayList DdayArr={DdayArr} />
                </GitWrap>
            </FlexRow>
        </>
    );
};

export default DashBoardPage;
