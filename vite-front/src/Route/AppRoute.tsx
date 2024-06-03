import { AnimatePresence } from 'framer-motion';
import { useLocation, Route, Routes } from 'react-router-dom';

import Motion from 'component/animations/Motion';

import RootNav from '@layout/RootNav';
import { ROUTE_PATH } from 'constants/routePath';
import { useEffect, useRef } from 'react';

const AppRoute = (): JSX.Element => {
    const location = useLocation();
    const pageKey = location.pathname.split('/')[1];

    const scrollYRef = useRef(0);

    useEffect(() => {
        console.log(scrollYRef.current);
    }, []);

    return (
        <>
            <RootNav />
            <AnimatePresence
                mode="wait"
                onExitComplete={() => window.scrollTo(0, scrollYRef.current)}
            >
                <Routes location={location} key={pageKey}>
                    {ROUTE_PATH.map(({ path, Component }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<Motion.Page>{Component}</Motion.Page>}
                        />
                    ))}
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default AppRoute;
