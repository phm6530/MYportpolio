import { Route, Routes, useLocation } from 'react-router-dom';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading.js';
import { BoardWrapper } from './BlogCommonStyle.js';
import { Tab } from './BlogCommonStyle.js';
import { AnimatePresence } from 'framer-motion';

import styled from 'styled-components';
import BlogTab from './BlogTab.js';
import BlogPage from './BlogPage/index.js';
import useBlogCategory from './hooks/useBlogCategory.js';
import BlogDetail from './BlogDetail/index.js';
import Motion from 'component/animations/Motion.js';
import BlogAdd from './BlogAdd/index.js';

const MotionStyle = styled(Motion.FadeInOut)`
    width: 100%;
`;

const BlogLayOut = () => {
    const { data, isLoading, isError } = useBlogCategory();

    const location = useLocation();

    if (isError) {
        return <>Error</>;
    }
    return (
        <>
            <BoardWrapper>
                {isLoading ? (
                    <SpinnerLoading />
                ) : (
                    <>
                        <Tab>
                            <BlogTab categories={data.resData} />
                        </Tab>

                        {/* ContentsArea */}
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route
                                    index
                                    element={
                                        <MotionStyle>
                                            <BlogPage data={data} />
                                        </MotionStyle>
                                    }
                                />
                                <Route
                                    path=":key"
                                    element={
                                        <MotionStyle>
                                            <BlogDetail />
                                        </MotionStyle>
                                    }
                                />
                                <Route
                                    path="/add"
                                    element={
                                        <MotionStyle>
                                            <BlogAdd />
                                        </MotionStyle>
                                    }
                                />
                            </Routes>
                        </AnimatePresence>
                    </>
                )}
            </BoardWrapper>
        </>
    );
};

export default BlogLayOut;
