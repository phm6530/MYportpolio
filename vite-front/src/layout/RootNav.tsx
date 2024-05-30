import { useState } from 'react';
import useLogout from '@features/auth/hooks/useLogout';

import styled from 'styled-components';

// Component

import Popup from 'component/popup/Popup';

import { useLocation, useNavigate } from 'react-router-dom';
import DarkModeBtn from 'component/ui/DarkModeBtn';
import LoginForm from '@features/auth/LoginForm';
import TopButton from 'component/ui/TopButton';

import { NAVPAGE_OBJECT } from 'constants/routePath';
import useStore from 'store/zustandStore';

// Nav 선택
interface LinkProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
    children,
    className,
    onClick,
    ...prop
}) => {
    return (
        <li className={className} onClick={onClick} {...prop}>
            {children}
        </li>
    );
};

//css in js  초기랜더링 > 훅실행 > 스타일 생성
const List = styled(Link)<{ $active?: boolean }>`
    transition: color 0.4s cubic-bezier(0, 0.88, 0, 1.03);
    color: var(--color-white);
`;

const Header = styled.header`
    position: fixed;
    z-index: 10;
    width: 100%;
    /* background: #ffffff14; */
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default function RootNav() {
    // const { view } = useSelector((state: RootState) => state.alert);
    const login = useStore(state => state.userAuth.login);
    const { pathname } = useLocation();
    const [loginModal, setLoginModal] = useState(false);
    const [active, setActive] = useState(pathname);
    const { mutateAsync } = useLogout();

    const navigate = useNavigate();
    const openLoginPopup = () => setLoginModal(true);

    return (
        <>
            {/* TopButton */}
            <TopButton />

            {/* Alert */}
            {/* {view && <Alert />} */}
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
                            {NAVPAGE_OBJECT.map((e, idx) => {
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
                                        // to={e.path}
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
                            {login && (
                                <List onClick={() => mutateAsync()}>
                                    로그아웃
                                </List>
                            )}
                        </ul>
                    </nav>
                </div>
            </Header>
        </>
    );
}
