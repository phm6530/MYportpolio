import ListHandler from './component/ListHandler';
import FadeinComponent from 'FadeinComponent';
import { useState } from 'react';

const ScheduleList = ({ selectDay, listData }) => {
    const [selectWork, setSelectWork] = useState(null);

    // const test  = dayFormetting();
    // console.log('selectDay ::: ', listData && listData[test(selectDay)]);

    const filterArr = [];
    for (const date in listData) {
        const formattedSelectDay = new Date(selectDay).toDateString();
        const formattedDate = new Date(date).toDateString();
        if (formattedSelectDay === formattedDate) {
            filterArr.push(...listData[date]);
        }
    }

    const test = filterArr.sort((a, b) => {
        return b.important - a.important;
    });

    return (
        <>
            {filterArr.length === 0 && (
                <FadeinComponent position={'right'} key={selectDay}>
                    {selectDay && selectDay.replaceAll('-', '. ')}은 일정이 없습니다.
                </FadeinComponent>
            )}

            {filterArr.map((Schedule, idx) => {
                return (
                    <FadeinComponent position={'right'} key={Schedule.schedule_key}>
                        <ListHandler
                            idx={idx}
                            ScheduleItem={Schedule}
                            setSelectWork={setSelectWork}
                            selectWork={selectWork}
                        />
                    </FadeinComponent>
                );
            })}
        </>
    );
};

export default ScheduleList;
