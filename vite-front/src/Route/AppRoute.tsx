import { AnimatePresence } from 'framer-motion';
import { useLocation, Route, Routes } from 'react-router-dom';

import Motion from 'component/animations/Motion';

import RootNav from '@layout/RootNav';
import { ROUTE_PATH } from 'constants/routePath';

const AppRoute = (): JSX.Element => {
    const location = useLocation();
    const pageKey = location.pathname.split('/')[1] || 'home';

    return (
        <>
            {' '}
            <RootNav />
            <AnimatePresence mode="wait">
                <Routes location={location} key={pageKey}>
                    {ROUTE_PATH.map(({ path, Component }) => {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Motion.Page>{Component}</Motion.Page>}
                            />
                        );
                    })}
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default AppRoute;
