import './App.css';
import { Provider } from 'react-redux';

// Rounter
import { BrowserRouter } from 'react-router-dom';

// context
import { Mode } from 'context/DarkModeContext';

// redux
import store from 'store/appSlice';

import RootNav from 'component/layout/RootNav';
import Footer from 'component/layout/Footer';
import AppRoute from 'Route/AppRoute';

import { ReactQuery } from 'lib/lib';

const { useIsFetching } = ReactQuery;

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
    return (
        <>
            <AppRoute />
        </>
    );
}

function App() {
    // const fetching = useIsFetching();
    // console.log(fetching);
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
