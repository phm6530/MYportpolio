import ListHandler from '../component/ListHandler';
import FadeinComponent from 'FadeinComponent';
import { useState } from 'react';
import { filterByDate } from '../component/filterByOrder';

const ScheduleList = ({ selectDay, listData }) => {
    const [selectWork, setSelectWork] = useState(null);

    const filterArr = filterByDate(listData, selectDay);
    // console.log(filterArr);

    return (
        <>
            {filterArr.length === 0 && (
                <FadeinComponent position={'right'} key={selectDay}>
                    {selectDay && selectDay.replaceAll('-', '. ')}은 일정이
                    없습니다.
                </FadeinComponent>
            )}

            {filterArr.map((Schedule, idx) => {
                // console.log(Schedule);
                return (
                    <FadeinComponent
                        position={'right'}
                        key={Schedule.schedule_key}
                    >
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
