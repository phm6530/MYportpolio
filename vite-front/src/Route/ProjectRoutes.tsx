import WithRedirect from 'hoc/WithRedirect';
import ProjectListDetail from '@features/project/ProjectDetail';
import ProjectEditor from '@features/project/ProjectEditor/ProjectEditor';
import Motion from 'component/animations/Motion';
import withAuth from 'hoc/WithAuth';

import styled from 'styled-components';
import ProjectList from '@features/project/ProjectList';

import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

const FlexMotion = styled(Motion.FadeInOut)`
    flex-grow: 1;
`;

const ProjectRoutes = () => {
    const location = useLocation();
    const AthencatedProjectEditor = withAuth(ProjectEditor, '/project');

    const paths = [
        { path: '/', index: true, Component: <ProjectList /> },

        {
            path: 'add',
            Component: <AthencatedProjectEditor />,
        },
        {
            path: '/:key',
            Component: (
                <WithRedirect
                    Component={ProjectListDetail}
                    redirectPath={'/project'}
                />
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
