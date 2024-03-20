import { FlexWrapDiv } from 'features/CommonStyles';
import SummaryHeader from '../ScheduleDashBoard/SummaryHeader';
import TotalGraph from '../component/TotalGraph';
import CategoryGraph from './CategoryGraph';
import { useEffect, useState } from 'react';
import { filterByDate } from '../component/filterByOrder';
import { dayFormetting } from 'utils/TodaySeletor';

const ScheduleSummary = props => {
    const { listData } = props;
    const [viewRage, setViewRage] = useState('today');
    const [arrState, setArrState] = useState();
    const [categorys, setCategorys] = useState();

    const today = new Date();
    const arrLength = today.getDay(); // 이번주 월부터 지금 요일까지 길이

    useEffect(() => {
        let selectedDates = [];
        if (viewRage === 'today') {
            const todayArr = filterByDate(listData, today);
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
            const values = Object.values(weekObj);

            values.forEach(e => selectedDates.push(...e));
        }

        // today
        const categoryFilter = selectedDates.reduce((acc, item) => {
            acc[item.category] = acc[item.category] || [];
            acc[item.category].push(item);
            return acc;
        }, {});

        const categorys = Object.keys(categoryFilter);
        setArrState(categoryFilter);
        setCategorys(categorys);
    }, [listData, viewRage]);

    return (
        <>
            <FlexWrapDiv>
                <SummaryHeader setViewRage={setViewRage} />
                {/* Total Graph */}
                {arrState && (
                    <TotalGraph
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
            </FlexWrapDiv>
        </>
    );
};

export default ScheduleSummary;
