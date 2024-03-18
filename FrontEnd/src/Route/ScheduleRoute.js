import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Motion from 'component/animations/Motion';
import DashBoardPage from 'page/MySchedule/Detail/DashBoardPage';
import ScheduleReport from 'page/MySchedule/Detail/ScheduleReport';
import TaskPage from 'page/MySchedule/Detail/TaskPage';

const ScheduleRoute = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    index={true}
                    element={
                        <Motion.FadeInOut>
                            <DashBoardPage />
                        </Motion.FadeInOut>
                    }
                />
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
