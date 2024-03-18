import styled from 'styled-components';
import ScheduleAdd from './ScheduleAdd';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import 'react-day-picker/dist/style.css';

// 커스텀훅 or 팝업창 or redux-Trunk
import Popup from '../../../component/popup/Popup';

import { Button } from '../../../component/ui/Button';
import { TodaySeletor } from 'utils/TodaySeletor';

// icon
import DdayHandler from 'features/Myschedule/component/DdayHandler';
import ScheduleList from './ScheduleList';
import ScheduleDdaySetter from '../component/ScheduleDdaySetter';

const ScheduleWrap = styled.div`
    width: 50%;
    overflow: hidden;
`;

const ButtonNavWrap = styled.div`
    border-radius: 1em;
    color: #fff;
`;

const DayStyle = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: #fff;
`;

export default function ScheduleContainer({
    selectDay,
    listData,
    setSelectDay,
}) {
    const [_, setSeachParam] = useSearchParams();
    const today = TodaySeletor();
    const [dDayForm, setDdayForm] = useState(false); //dDay Popup
    // const formMethods = useForm({
    //     defaultValues: {
    //         dDay: '',
    //     },
    // });
    const todayButton = () => {
        setSelectDay(today());
        setSeachParam({
            year: today().split('-')[0],
            month: today().split('-')[1],
        });
    };

    const DdayPopupShow = () => {
        setDdayForm(prev => !prev);
    };

    return (
        <>
            {dDayForm && (
                <Popup closePopup={() => setDdayForm(false)}>
                    <ScheduleDdaySetter />
                </Popup>
            )}

            <ScheduleWrap>
                <ButtonNavWrap>
                    <Button.ForsquareBtn onClick={() => todayButton()}>
                        ToDay
                    </Button.ForsquareBtn>
                    <Button.ForsquareBtn onClick={() => DdayPopupShow()}>
                        D-day 설정
                    </Button.ForsquareBtn>
                    <Button.ForsquareBtn onClick={() => todayButton()}>
                        일정 변경
                    </Button.ForsquareBtn>
                </ButtonNavWrap>

                <DayStyle>{selectDay.replaceAll('-', '. ')}</DayStyle>

                <ScheduleList
                    listData={listData}
                    selectDay={selectDay} //업로드해야할 날짜
                />
                <ScheduleAdd
                    selectDay={selectDay} //업로드해야할 날짜
                />
            </ScheduleWrap>
        </>
    );
}
