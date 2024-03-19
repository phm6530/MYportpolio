import { Outlet, useLocation } from 'react-router-dom';
import DashBoard from 'component/ui/DashBoard';
import BannerCommon from 'component/ui/BannerCommon';
import DashBoardTitle from 'component/ui/DashBoardTitle';
import Gird from 'component/ui/Grid';
import styled from 'styled-components';
import Project from 'page/Project';
import ProjectList from 'page/MyProject/component/ProjectList/ProjectList';
import SubTitle from 'component/ui/Subtitle';
const ProjectGird = styled(Gird)`
    padding-top: 25rem;
    display: flex;
`;

const ProjectWrap = styled.div`
    display: flex;
`;
import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import UserProfile from 'component/profile/UserProfile';
import WithRedirect from 'component/hoc/WithRedirect';
import ProjectDetail from 'page/MyProject/component/ProjectList/ProjectDetail';
import AddProject from 'page/MyProject/component/AddProject/AddProject';
import Motion from 'component/animations/Motion';
import WithAuth from 'component/hoc/WithAuth';

const FlexMotion = styled(Motion.FadeInOut)`
    flex-grow: 1;
`;

export default function ProjectLayout() {
    const location = useLocation();
    return (
        <>
            <DashBoard>
                <BannerCommon.BannerPoint>
                    <img src="/img/developer.png" alt="developer" />
                    My Project
                </BannerCommon.BannerPoint>
                <DashBoardTitle>
                    <b>PROJECT</b>
                </DashBoardTitle>
            </DashBoard>

            <ProjectGird>
                <UserProfile />
                {/* 하위컴포넌트들  */}
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route
                            index
                            element={
                                <Motion.FadeInOut>
                                    <ProjectList />
                                </Motion.FadeInOut>
                            }
                        />
                        <Route
                            path=":key"
                            element={
                                <FlexMotion>
                                    <WithRedirect
                                        Component={ProjectDetail}
                                        redirectPath={'/project'}
                                    />
                                </FlexMotion>
                            }
                        />
                        <Route
                            path="add"
                            element={
                                <Motion.FadeInOut>
                                    <WithAuth
                                        Component={AddProject}
                                        redirectPath={'/project'}
                                    />
                                </Motion.FadeInOut>
                            }
                        />

                        {/* 추가적으로 필요한 라우트를 여기에 정의할 수 있습니다. */}
                    </Routes>
                </AnimatePresence>
            </ProjectGird>
        </>
    );
}
