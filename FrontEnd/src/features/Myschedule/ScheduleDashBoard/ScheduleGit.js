import { SubTitleTextStyle } from 'features/CommonStyles';
import { HourStyle } from '../component/styles/ScheduleCommonStyles';
import { FlexColumnDiv } from 'features/CommonStyles';
import styled from 'styled-components';

const CustumHourStyle = styled(HourStyle)`
    margin-bottom: 0;
`;

const ScheduleGit = () => {
    const Commit = 2;
    return (
        <FlexColumnDiv>
            <SubTitleTextStyle>Git Commit</SubTitleTextStyle>
            <CustumHourStyle>{Commit}</CustumHourStyle>
        </FlexColumnDiv>
    );
};

export default ScheduleGit;
