import ScheduleContainer from 'features/Myschedule/ScheduleContainer';
import { CalendarStyle } from '../MyScheduleStyle';
import styled from 'styled-components';

const TaskPage = props => {
    const { setSelectDay, listData, selectDay, paramYear, paramMonth } = props;

    return (
        <>
            <CalendarStyle
                setSelectDay={setSelectDay}
                listData={listData}
                selectDay={selectDay}
                paramYear={paramYear}
                paramMonth={paramMonth}
            />

            <ScheduleContainer
                selectDay={selectDay}
                listData={listData}
                setSelectDay={setSelectDay}
            />
        </>
    );
};

export default TaskPage;
