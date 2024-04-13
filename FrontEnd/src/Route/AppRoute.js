import Motion from 'component/animations/Motion';
import { AnimatePresence } from 'framer-motion';
import HomeComponent from 'page/Home/HomeComponent';
import ProjectLayout from 'features/project/ProjectLayout';
import MySchedule from 'page/MySchedule/MySchedule';
import Board from 'page/Board/Board';
import Contact from 'page/contact/Contact';
import { useLocation, Route, Routes } from 'react-router-dom';
import InfiniteScrollTest from 'test.bak';
const AppRoute = () => {
    const location = useLocation();
    const pageKey = location.pathname.split('/')[1] || 'home';

    return (
        <>
            <AnimatePresence mode="wait">
                <Routes location={location} key={pageKey}>
                    <Route
                        path="/"
                        element={
                            <Motion.Page>
                                <HomeComponent />
                            </Motion.Page>
                        }
                    />
                    <Route
                        path="/project/*"
                        element={
                            <Motion.Page>
                                <ProjectLayout />
                            </Motion.Page>
                        }
                    />
                    <Route
                        path="/myschedule/*"
                        element={
                            <Motion.Page>
                                <MySchedule />
                            </Motion.Page>
                        }
                    />

                    <Route
                        path="/Board"
                        element={
                            <Motion.Page>
                                <Board />
                            </Motion.Page>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <Motion.Page>
                                <Contact />
                            </Motion.Page>
                        }
                    />
                    <Route
                        path="/test"
                        element={
                            <Motion.Page>
                                <InfiniteScrollTest />
                            </Motion.Page>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default AppRoute;
