import { FlexWrapDiv } from 'features/CommonStyles';
import SummaryHeader from '../ScheduleDashBoard/SummaryHeader';
import TotalGraph from '../component/TotalGraph';
import CategoryGraph from './CategoryGraph';
import { useEffect, useMemo, useState } from 'react';
import { filterByDate } from '../component/filterByOrder';
import { dayFormetting } from 'utils/TodaySeletor';
import { ReactQuery } from 'lib/lib';
import { scheduleWeekorDay } from 'services/ScheduleService';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import ScheduleGit from '../ScheduleDashBoard/ScheduleGit';
import styled from 'styled-components';

const CustumFlexWrapDiv = styled(FlexWrapDiv)``;

const { useQuery } = ReactQuery;
const ScheduleSummary = props => {
    const { listData } = props;
    const [viewRage, setViewRage] = useState('today');
    const [arrState, setArrState] = useState();
    const [categorys, setCategorys] = useState();
    const [selectDays, setSelectDays] = useState([]);
    const today = useMemo(() => {
        return new Date();
    }, []);

    console.log(selectDays);

    const arrLength = today.getDay(); // 이번주 월부터 지금 요일까지 길이
    useEffect(() => {
        let selectedDates = [];
        let selectDay = [];

        if (viewRage === 'today') {
            const todayArr = filterByDate(listData, today);
            selectDay.push(today);
            selectedDates = todayArr;
        } else {
            const dayCalculate = dayFormetting();
            const weekDayArr = [...Array(arrLength)].map((_, idx) => {
                const tempDate = new Date(today);
                const test = tempDate.setDate(tempDate.getDate() - idx);
                return dayCalculate(test);
            });

            let weekObj = {};
            weekDayArr.reduce((_, cur) => {
                if (listData[cur]) {
                    weekObj[cur] = listData[cur];
                }
            }, {});
            console.log(weekObj);
            const values = Object.values(weekObj);
            const keys = Object.keys(weekObj);
            // console.log(keys);
            selectDay.push(keys[keys.length - 1]);
            selectDay.push(keys[0]);
            console.log(selectDay);
            values.forEach(e => selectedDates.push(...e));
        }

        // today
        const categoryFilter = selectedDates.reduce((acc, item) => {
            acc[item.category] = acc[item.category] || [];
            acc[item.category].push(item);
            return acc;
        }, {});

        const categorys = Object.keys(categoryFilter);

        setSelectDays(selectDay.map(e => format(e, 'MM. dd')));
        setArrState(categoryFilter);
        setCategorys(categorys);
    }, [listData, viewRage, today, arrLength]);

    return (
        <>
            <CustumFlexWrapDiv>
                <SummaryHeader viewRage={viewRage} setViewRage={setViewRage} />
                {/* Total Graph */}
                {/* <DayPicker
                    mode="range"
                    onSelect={setSelected}
                    selected={selected}
                /> */}
                {arrState && (
                    <TotalGraph
                        selectDays={selectDays}
                        viewRage={viewRage}
                        arrState={arrState}
                        {...props}
                    />
                )}
                {/* CategoryGraph */}
                <CategoryGraph
                    viewRage={viewRage}
                    categorys={categorys}
                    arrState={arrState}
                />
            </CustumFlexWrapDiv>
        </>
    );
};

export default ScheduleSummary;
