import ScheduleContainer from 'features/Myschedule/ScheduleContainer';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';
import TaskNav from 'features/Myschedule/TaskNav';
// import Calendar from 'features/Myschedule/Calendar';
import styled from 'styled-components';

const ScheduleDdayListStyle = styled(ScheduleDdayList)``;

const TaskPage = props => {
    const {
        setSelectDay,
        listData,
        selectDay,
        paramYear,
        paramMonth,
        DdayArr,
    } = props;
    // console.log(props);
    const [select, setSelect] = useState(new Date());
    // console.log('select::::', select);
    // console.log('selectDay ::::: ', selectDay);

    const bookedDays = [new Date(2024, 3 - 1, 10), new Date(2024, 3 - 1, 19)];

    const bookedStyle = { border: '2px solid red' };
    const modifiersStyles = {
        selected: { backgroundColor: '#00f', color: '#fff' }, // 예시: 파란 배경에 흰 글씨
        booked: bookedStyle, // bookedStyle은 사전에 정의된 스타일 객체이어야 함
    };

    const test = date => {
        if (!date) return; // date undefined 취소방지
        const formating = format(date, 'yyyy-MM-dd');
        setSelect(date);
        setSelectDay(formating);
    };

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleMonthChange = date => {
        const dateFormat = format(date, 'yyyy-MM').split('-');
        navigate(`${pathname}?year=${dateFormat[0]}&month=${+dateFormat[1]}`);
    };

    return (
        <div className="flex-row-wrap">
            {/* <ScheduleDdayList DdayArr={DdayArr} /> */}
            <div className="flex-column-wrap" style={{ width: '35%' }}>
                <DayPicker
                    className="vv"
                    mode="single"
                    selected={new Date(selectDay)}
                    onSelect={e => test(e)}
                    modifiers={{ booked: bookedDays }}
                    modifiersStyles={modifiersStyles}
                    onMonthChange={e => handleMonthChange(e)}
                    // footer={footer}
                />
                <ScheduleDdayList DdayArr={DdayArr} />
                {/* <Calendar
                setSelectDay={setSelectDay}
                listData={listData}
                selectDay={selectDay}
                paramYear={paramYear}
                paramMonth={paramMonth}
            /> */}
            </div>

            <div className="flex-column-wrap flex-grow">
                <TaskNav selectDay={selectDay} listData={listData} />

                <ScheduleContainer
                    selectDay={selectDay}
                    listData={listData}
                    setSelectDay={setSelectDay}
                />
            </div>
        </div>
    );
};

export default TaskPage;
