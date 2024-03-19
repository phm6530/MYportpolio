import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Motion from 'component/animations/Motion';
import DashBoardPage from 'page/MySchedule/Detail/DashBoardPage';
import ScheduleReport from 'page/MySchedule/Detail/ScheduleReport';
import TaskPage from 'page/MySchedule/Detail/TaskPage';

const ScheduleRoute = ({
    setSelectDay,
    listData,
    selectDay,
    paramYear,
    paramMonth,
    DdayArr,
}) => {
    const location = useLocation();

    const DashBoardElement = (
        <Motion.FadeInOut>
            <DashBoardPage
                setSelectDay={setSelectDay}
                listData={listData}
                selectDay={selectDay}
                paramYear={paramYear}
                paramMonth={paramMonth}
                DdayArr={DdayArr}
            />
        </Motion.FadeInOut>
    );

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route index={true} element={DashBoardElement} />
                <Route path="dashboard" element={DashBoardElement} />
                <Route
                    path="task"
                    element={
                        <Motion.FadeInOut>
                            <TaskPage />
                        </Motion.FadeInOut>
                    }
                />
                <Route
                    path="report"
                    element={
                        <Motion.FadeInOut>
                            <ScheduleReport />
                        </Motion.FadeInOut>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default ScheduleRoute;
