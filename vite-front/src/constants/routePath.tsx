import Contact from 'page/contact/Contact';
import InfiniteScrollTest from 'test.bak';
import NotfoundPage from 'component/error/NotfoundPage';
import Blog from 'page/blog/Blog';
import Project from '@page/Project';
import About from '@page/about/About';
import Home from '@page/Home';
import Board from '@page/Board/Board';
import MySchedule from '@page/MySchedule/MySchedule';

interface RoutePath {
    path: string;
    Component: JSX.Element;
}

interface NavPage {
    path: string;
    pathName: string;
    AuthPage: boolean;
}

export const ROUTE_PATH: RoutePath[] = [
    { path: '/', Component: <Home /> },
    { path: '/about', Component: <About /> },
    { path: '/project/*', Component: <Project /> },
    { path: '/myschedule/*', Component: <MySchedule /> },
    { path: '/Board', Component: <Board /> },
    { path: '/contact', Component: <Contact /> },
    { path: '/blog/*', Component: <Blog /> },
    { path: '/test', Component: <InfiniteScrollTest /> },
    { path: '/*', Component: <NotfoundPage redirectPath={'/'} /> },
];

export const NAVPAGE_OBJECT: NavPage[] = [
    { path: '/', pathName: 'HOME', AuthPage: false },
    { path: '/about', pathName: 'About', AuthPage: false },
    { path: '/project', pathName: 'PROJECT', AuthPage: false },
    { path: '/myschedule', pathName: 'MY Calendar', AuthPage: false },
    { path: '/blog', pathName: 'Blog', AuthPage: false },
    { path: '/Board', pathName: 'Board', AuthPage: false },
    { path: '/contact', pathName: 'Contact', AuthPage: false },
];
