import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Motion from 'component/animations/Motion';
import DashBoardPage from 'page/MySchedule/Detail/DashBoardPage';
import ScheduleReport from 'page/MySchedule/Detail/ScheduleReport';
import TaskPage from 'page/MySchedule/Detail/TaskPage';
import styled from 'styled-components';

const MotionStyle = styled(Motion.FadeInOut)`
    width: 100%;
`;

const ScheduleRoute = props => {
    const location = useLocation();

    const DashBoardElement = (
        <MotionStyle>
            {props.listData && <DashBoardPage {...props} />}
        </MotionStyle>
    );

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route index={true} element={DashBoardElement} />
                <Route path="dashboard" element={DashBoardElement} />
                <Route
                    path="task"
                    element={
                        <MotionStyle>
                            <TaskPage {...props} />
                        </MotionStyle>
                    }
                />
                <Route
                    path="report"
                    element={
                        <Motion.FadeInOut>
                            <ScheduleReport {...props} />
                        </Motion.FadeInOut>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default ScheduleRoute;
