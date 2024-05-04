import WithRedirect from 'component/hoc/WithRedirect';
import ProjectDetail from 'page/Project/pages/ProjectDetail';
import ProjectAdd from 'page/Project/pages/ProjectAdd';
import Motion from 'component/animations/Motion';
import WithAuth from 'component/hoc/WithAuth';

import styled from 'styled-components';
import ProjectIndex from 'page/Project/pages/ProjectIndex';

import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

const FlexMotion = styled(Motion.FadeInOut)`
    flex-grow: 1;
`;

const ProjectRoutes = () => {
    const location = useLocation();
    const paths = [
        { path: '/', index: true, Component: <ProjectIndex /> },
        {
            path: ':key',
            Component: (
                <WithRedirect
                    Component={ProjectDetail}
                    redirectPath={'/project'}
                />
            ),
        },
        {
            path: 'add',
            Component: (
                <WithAuth Component={ProjectAdd} redirectPath={'/project'} />
            ),
        },
    ];

    return (
        <>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {paths.map(path => {
                        return (
                            <Route
                                path={path.path}
                                key={path.path}
                                element={
                                    <FlexMotion>{path.Component}</FlexMotion>
                                }
                            />
                        );
                    })}
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default ProjectRoutes;
