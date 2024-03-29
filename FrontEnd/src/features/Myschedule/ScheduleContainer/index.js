import styled from 'styled-components';
import ScheduleAdd from './ScheduleAdd';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import 'react-day-picker/dist/style.css';

// 커스텀훅 or 팝업창 or redux-Trunk
import Popup from '../../../component/popup/Popup';

// icon
import ScheduleList from './ScheduleList';
import ScheduleDdaySetter from '../component/ScheduleDdaySetter';

import { AnimatePresence } from 'framer-motion';
import Motion from 'component/animations/Motion';

const ScheduleWrap = styled.div`
    flex-grow: 1;
`;

const DayStyle = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: #fff;
`;

export default function ScheduleContainer({ selectDay, listData }) {
    //dDay Popup
    // const formMethods = useForm({
    //     defaultValues: {
    //         dDay: '',
    //     },
    // });

    return (
        <>
            <ScheduleWrap>
                <DayStyle>{selectDay.replaceAll('-', '. ')}</DayStyle>
                <AnimatePresence mode="wait">
                    <Motion.FadeInOut key={selectDay}>
                        <ScheduleList
                            listData={listData}
                            selectDay={selectDay} //업로드해야할 날짜
                        />
                    </Motion.FadeInOut>
                </AnimatePresence>
                <ScheduleAdd
                    selectDay={selectDay} //업로드해야할 날짜
                />
            </ScheduleWrap>
        </>
    );
}
