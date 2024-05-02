import { useState } from 'react';
import useLogout from 'hooks/useLogout';

import styled from 'styled-components';

// redux
import { useSelector } from 'react-redux';

// Component
import Alert from 'component/alert/Alert';
import Popup from '../popup/Popup';

import DarkModeBtn from '../ui/DarkModeBtn';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../popup/login/LoginForm';
import TopButton from 'component/ui/TopButton';
import useUserDecoded from 'hooks/useUserDecoded';

// Nav 선택
const Link = ({ children, className, to, ...prop }) => {
    return (
        <li className={className} {...prop}>
            {children}
        </li>
    );
};

//css in js  초기랜더링 > 훅실행 > 스타일 생성
const List = styled(Link)`
    transition: color 0.4s cubic-bezier(0, 0.88, 0, 1.03);
    color: var(--white-color);
`;

const Header = styled.header`
    position: fixed;
    z-index: 1;
    width: 100%;
    /* background: #ffffff14; */
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default function RootNav() {
    const { view } = useSelector(state => state.alertSlice);
    const { login } = useSelector(state => state.authSlice);
    const { pathname } = useLocation();
    const [loginModal, setLoginModal] = useState(false);
    const [active, setActive] = useState(pathname);
    const logout = useLogout();

    useUserDecoded(); //사용자정보

    const navigate = useNavigate();

    const NavPageObject = [
        { path: '/', pathName: 'HOME', AuthPage: false },
        { path: '/project', pathName: 'PROJECT', AuthPage: false },
        { path: '/myschedule', pathName: 'MY Calendar', AuthPage: false },
        { path: '/blog', pathName: 'Blog', AuthPage: false },
        { path: '/Board', pathName: 'Board', AuthPage: false },
        { path: '/contact', pathName: 'contact', AuthPage: false },
    ];
    // useEffect(() => {
    //     const Top = setTimeout(() => {
    //         window.scrollTo(0, 0);
    //     }, 290);
    //     return () => {
    //         clearTimeout(Top);
    //     };
    // }, [location.pathname]);

    const openLoginPopup = () => setLoginModal(true);

    return (
        <>
            {/* TopButton */}
            <TopButton />

            {/* Alert */}
            {view && <Alert />}
            {loginModal && (
                <Popup type={'Login'} closePopup={() => setLoginModal(false)}>
                    <LoginForm />
                </Popup>
            )}

            <Header>
                <div className="wrap">
                    <nav>
                        <DarkModeBtn />

                        {/* Nav */}
                        <ul>
                            {NavPageObject.map((e, idx) => {
                                // console.log(e.p);
                                if (e.AuthPage) {
                                    return (
                                        login && (
                                            <List
                                                key={idx}
                                                $active={active === e.path}
                                            >
                                                {e.pathName}
                                            </List>
                                        )
                                    );
                                }
                                return (
                                    <List
                                        to={e.path}
                                        key={idx}
                                        $active={active === e.path}
                                        onClick={() => {
                                            // ChangePageHandler(e.path);
                                            setActive(e.path);
                                            navigate(e.path);
                                        }}
                                    >
                                        {e.pathName}
                                    </List>
                                );
                            })}

                            {/* login Component */}
                            {!login && (
                                <List onClick={openLoginPopup}>로그인</List>
                            )}
                            {login && <List onClick={logout}>로그아웃</List>}
                        </ul>
                    </nav>
                </div>
            </Header>
        </>
    );
}
