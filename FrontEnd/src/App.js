import './App.css';
import { Provider } from 'react-redux';

// Rounter
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import RootLayout from 'component/layout/RootLayout';
import Motion from 'component/animations/Motion';

// context
import { Mode } from 'context/DarkModeContext';

// redux
import store from 'store/appSlice';

import { AnimatePresence } from 'framer-motion';

// Home
import HomeComponent from './page/Home/HomeComponent';
// import { projectChangeLoader } from './page/MyProject/ProjectFetch'; //add Loader

// MyProject
import Project from 'page/Project';
import AddProject from './page/MyProject/component/AddProject/AddProject';

// Notice
import Board from './page/Board/Board';

// admin
import Admin from './page/admin/Admin';

import ProjectDetail from './page/MyProject/component/ProjectList/ProjectDetail';

//Auth Util 권한 Check
import { tokenCheck } from 'services/authService';
import Todolist from './page/todo/Todolist';
import WithAuth from 'component/hoc/WithAuth';

import WithRedirect from 'component/hoc/WithRedirect';

import { fetchDetail } from 'services/projectService';

import Test from './test';
import ErrorRoot from 'component/error/ErrorRoot';
import Contact from './page/contact/Contact';
import ProjectLayout from 'features/project/ProjectLayout';
import ProjectList from './page/MyProject/component/ProjectList/ProjectList';
import { useEffect } from 'react';
import RootNav from 'component/layout/RootNav';
import Footer from 'component/layout/Footer';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <RootLayout />,
//         errorElement: <ErrorRoot />,
//         id: 'auth',
//         children: [
//             {
//                 index: true,
//                 element: <HomeComponent />,
//             },

//             // ProjectLayOut Outlet
//             {
//                 path: '/project',
//                 element: <ProjectLayout />,
//                 children: [
//                     {
//                         // index : true,
//                         element: <Project />,
//                         children: [
//                             {
//                                 index: true,
//                                 element: <ProjectList />,
//                             },
//                             {
//                                 path: ':key',
//                                 element: <WithRedirect Component={ProjectDetail} redirectPath={'/project'} />,
//                             },
//                         ],
//                     },
//                     {
//                         path: 'add',
//                         element: <WithAuth Component={AddProject} redirectPath={'/project'} />,
//                         loader: tokenCheck,
//                     },
//                 ],
//             },

//             // Board
//             {
//                 path: '/Board',
//                 children: [
//                     {
//                         index: true,
//                         element: <Board />,
//                         // loader : boardList,
//                         // action : replyAction
//                     },
//                     // ,
//                     // {
//                     //   path: ':num',
//                     //   element : <BoardDetail/>,
//                     //   loader : tokenCheck,
//                     // },
//                     // {
//                     //   path : 'wirte',
//                     //   element : <BoardWirte/>,
//                     //   loader : tokenCheck,
//                     // }
//                 ],
//             },
//             {
//                 path: 'todoCalnder',
//                 element: <Todolist />,
//             },
//             // 관리자페이지
//             {
//                 path: '/admin',
//                 element: <WithAuth Component={Admin} redirectPath={'/'} />,
//                 loader: tokenCheck,
//             },
//             {
//                 path: '/test',
//                 element: <Test />,
//             },
//             {
//                 path: '/contact',
//                 element: <Contact />,
//             },
//         ],
//     },
// ]);

function AnimatedRoutes() {
    const location = useLocation();
    const pageKey = location.pathname.split('/')[1] || 'home';

    return (
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
                    path="/todoCalnder/*"
                    element={
                        <Motion.Page>
                            <Todolist />
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
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        // darkMode - Context Api
        <Mode>
            {/* redux */}
            <Provider store={store}>
                {/* <RouterProvider router={router} /> */}
                <BrowserRouter>
                    <RootNav />
                    <AnimatedRoutes />
                    <Footer />
                </BrowserRouter>
            </Provider>
        </Mode>
    );
}

export default App;
