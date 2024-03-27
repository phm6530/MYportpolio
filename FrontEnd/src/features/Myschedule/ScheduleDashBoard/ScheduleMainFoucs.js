import { SubTitleTextStyle, FlexWrapDiv } from 'features/CommonStyles';
import {
    HourStyle,
    FoucesStyle,
} from '../component/styles/ScheduleCommonStyles';

import styled from 'styled-components';
import { Heading } from '@chakra-ui/react';

const FlexWrapDivCustum = styled(FlexWrapDiv)`
    width: 50%;
    align-items: start;
`;

const ScheduleMainFoucs = ({ show }) => {
    const Hour = 10;
    const foucs = 'Coding';
    return (
        <>
            <FlexWrapDivCustum>
                <SubTitleTextStyle>Main Fouce Today</SubTitleTextStyle>
                {show === 'hour' ? (
                    <Heading>
                        <HourStyle>{Hour}h</HourStyle>
                    </Heading>
                ) : (
                    <Heading>
                        <HourStyle>{foucs}</HourStyle>
                    </Heading>
                )}
            </FlexWrapDivCustum>
        </>
    );
};

export default ScheduleMainFoucs;
