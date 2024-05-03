import styled from 'styled-components';
import { useLocation, Route, Routes } from 'react-router-dom';
import BlogDetail from 'features/Blog/BlogDetail/index.js';

import { AnimatePresence } from 'framer-motion';
import Motion from 'component/animations/Motion.js';
import BlogAdd from 'features/Blog/BlogAdd';
import BlogPage from 'features/Blog/BlogPage/index.js';

const MotionStyle = styled(Motion.FadeInOut)`
    width: 100%;
`;
const BlogRoutes = ({ data }) => {
    const location = useLocation();
    const paths = [
        { path: '/', index: true, Component: <BlogPage data={data} /> },
        { path: '/:key', Component: <BlogDetail /> },
        { path: '/add', Component: <BlogAdd /> },
    ];

    return (
        <>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {paths.map(path => {
                        console.log(path);
                        return (
                            <Route
                                path={path.path}
                                key={path.path}
                                element={
                                    <MotionStyle>{path.Component}</MotionStyle>
                                }
                            />
                        );
                    })}
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default BlogRoutes;
