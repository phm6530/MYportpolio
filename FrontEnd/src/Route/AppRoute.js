import Motion from 'component/animations/Motion';
import { AnimatePresence } from 'framer-motion';
import { useLocation, Route, Routes } from 'react-router-dom';

import HomeComponent from 'page/Home/HomeComponent';
import MySchedule from 'page/MySchedule/MySchedule';
import Board from 'page/Board/Board';
import Contact from 'page/contact/Contact';
import InfiniteScrollTest from 'test.bak';
import NotfoundPage from 'component/error/NotfoundPage';
import Blog from 'page/blog/Blog';
import Project from 'page/Project';

const AppRoute = () => {
    const location = useLocation();
    const pageKey = location.pathname.split('/')[1] || 'home';

    const paths = [
        { path: '/', Component: <HomeComponent /> },
        { path: '/project/*', Component: <Project /> },
        { path: '/myschedule/*', Component: <MySchedule /> },
        { path: '/Board', Component: <Board /> },
        { path: '/contact', Component: <Contact /> },
        { path: '/blog/*', Component: <Blog /> },
        { path: '/test', Component: <InfiniteScrollTest /> },
        { path: '/*', Component: <NotfoundPage /> },
    ];

    return (
        <>
            <AnimatePresence mode="wait">
                <Routes location={location} key={pageKey}>
                    {paths.map(path => {
                        return (
                            <Route
                                path={path.path}
                                key={path.path}
                                element={
                                    <Motion.Page>{path.Component}</Motion.Page>
                                }
                            />
                        );
                    })}
                    ;
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default AppRoute;
