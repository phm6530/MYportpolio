import { SubTitleTextStyle } from 'features/CommonStyles';
import { HourStyle } from '../component/styles/ScheduleCommonStyles';
import { FlexColumnDiv } from 'features/CommonStyles';

const ScheduleGit = () => {
    const Commit = 2;
    return (
        <FlexColumnDiv>
            <SubTitleTextStyle>Git Commit</SubTitleTextStyle>
            <HourStyle>{Commit}</HourStyle>
        </FlexColumnDiv>
    );
};

export default ScheduleGit;
