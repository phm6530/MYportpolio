import { useState, useMemo } from 'react';
import { filterByDate } from 'features/Myschedule/component/filterByOrder';
import { format } from 'date-fns';
import { dayFormetting } from 'utils/TodaySeletor';

const useCategoryFilter = ({ listData, selectDay: day = null }) => {
    const [viewRage, setViewRage] = useState('today');

    const today = useMemo(() => {
        return new Date();
    }, []);

    const Day = useMemo(() => {
        return day ? new Date(day) : null;
    }, [day]);

    console.log(Day);

    const targetDay = Day || today;

    let selectDay = [];
    let selectedDates = [];
    const arrLength = targetDay.getDate();

    if (viewRage === 'today') {
        const todayArr = filterByDate(listData, targetDay);
        selectDay.push(targetDay);
        selectedDates = todayArr;
    } else {
        const dayCalculate = dayFormetting();
        const weekDayArr = [...Array(arrLength)].map((_, idx) => {
            const tempDate = new Date(today);
            const date = tempDate.setDate(tempDate.getDate() - idx);
            return dayCalculate(date);
        });

        let weekObj = weekDayArr.reduce((acc, cur) => {
            if (listData[cur]) {
                acc[cur] = listData[cur];
            }
            return acc;
        }, {});

        const values = Object.values(weekObj);
        const keys = Object.keys(weekObj);
        selectDay.push(keys[keys.length - 1], keys[0]);
        values.forEach(e => selectedDates.push(...e));
    }

    const newCategoryFilter = selectedDates.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const newCateGorys = Object.keys(newCategoryFilter);
    const newSelectDays = selectDay.map(e => format(e, 'MM. dd'));

    const selectDays = newSelectDays;
    const categoryFilter = newCategoryFilter;
    const cateGorys = newCateGorys;
    // 의존성 배열에 listData, today, viewRage를 추가

    return {
        cateGorys,
        selectDays,
        categoryFilter,
        setViewRage,
        viewRage,
    };
};

export default useCategoryFilter;
