import { SubTitleTextStyle, FlexWrapDiv } from 'features/CommonStyles';
import {
    HourStyle,
    FoucesStyle,
} from '../component/styles/ScheduleCommonStyles';

import styled from 'styled-components';
import { Heading } from '@chakra-ui/react';
import { format } from 'date-fns';

const FlexWrapDivCustum = styled(FlexWrapDiv)`
    width: 30%;
    align-items: start;
`;

const ItemWrap = styled.div`
    margin-bottom: 1.8rem;
`;

const ScheduleMainFoucs = ({ timerData, categoryDailyTotals }) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    console.log(today);

    const filterDate = categoryDailyTotals.filter(e => {
        return e.date === today;
    });

    const parseTotalTime = time => {
        const [hour, minutes, seconed] = time.split(':').map(e => +e);
        return hour * 3600 + minutes * 60 + seconed;
    };

    // const hour = Math.floor(total / 3600);
    // const minites = Math.floor((total % 3600) / 60);
    // const seconed = total % 60;

    // 선택정렬
    filterDate.sort(
        (a, b) => parseTotalTime(b.totalTime) - parseTotalTime(a.totalTime),
    );

    console.log(filterDate);

    // const Hour = 10;
    // const foucs = 'Coding';
    return (
        <>
            {filterDate.map((item, idx) => {
                return (
                    <ItemWrap key={idx}>
                        <SubTitleTextStyle>Main Fouce Today</SubTitleTextStyle>
                        <HourStyle>{item.totalTime}</HourStyle>
                        {item.category}
                    </ItemWrap>
                );
            })}
            {/* {show === 'hour' ? (
                <Heading>
                    <HourStyle>{Hour}h</HourStyle>
                </Heading> 
            ) : (
                <Heading>
                    <HourStyle>{foucs}</HourStyle>
                </Heading>
            )} */}
        </>
    );
};

export default ScheduleMainFoucs;
