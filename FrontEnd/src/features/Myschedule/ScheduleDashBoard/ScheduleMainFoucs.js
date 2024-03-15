import { SubTitleTextStyle, FlexWrapDiv } from 'features/CommonStyles';
import { HourStyle, FoucesStyle } from '../component/styles/ScheduleCommonStyles';

import styled from 'styled-components';

const FlexWrapDivCustum = styled(FlexWrapDiv)`
    width: 60%;
`;

const ScheduleMainFoucs = () => {
    const Hour = 10;
    const foucs = 'coding';
    return (
        <FlexWrapDivCustum>
            <SubTitleTextStyle>Main Fouce Today</SubTitleTextStyle>
            <HourStyle>{Hour}h</HourStyle>
            <FoucesStyle>{foucs}</FoucesStyle>
        </FlexWrapDivCustum>
    );
};

export default ScheduleMainFoucs;
