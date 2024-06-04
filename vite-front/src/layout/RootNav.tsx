import { useState } from 'react';
import useLogout from '@features/auth/hooks/useLogout';

import styled, { css } from 'styled-components';

// Component
import Popup from 'component/popup/Popup';

import { useLocation, useNavigate } from 'react-router-dom';
import DarkModeBtn from 'component/ui/DarkModeBtn';
import LoginForm from '@features/auth/LoginForm';
import TopButton from 'component/ui/TopButton';

import { NAVPAGE_OBJECT } from 'constants/routePath';
import useStore from 'store/zustandStore';
import useScrollY from '@hooks/useScrollY';
import { Grid } from '@layout/Grid';
import { device } from 'config/DeviceConfig';

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

interface ListProps {
    $active?: boolean;
    $scrollOver?: boolean;
    $darkMode?: boolean;
    $path?: boolean;
}

const ScrollOverColor = ({ $scrollOver, $darkMode, $path }: ListProps) => {
    if (!$path) {
        if ($scrollOver) {
            return 'var(--Nav-color)';
        } else if (!$scrollOver && !$darkMode) {
            return 'rgb(182, 190, 201)';
        }
    }
};

const List = styled(Link)<ListProps>`
    color: ${({ $scrollOver, $darkMode, $path }) =>
        ScrollOverColor({ $scrollOver, $darkMode, $path })};
    transition: color 1s ease;
`;

const Header = styled.header<ListProps>`
    position: fixed;
    z-index: 10;
    width: 100%;
    backdrop-filter: blur(10px);
    border-bottom: var(--Nav-navBorder);
    font-family: 'Pretendard-Regular';
    ${({ $scrollOver, $path, $darkMode }) => {
        if (!$path) {
            if ($scrollOver && !$darkMode) {
                console.log('$darkMode', $darkMode);
                return css`
                    background: var(--Nav-Background-color);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                `;
            }
        }
        return css`
            color: rgb(182, 190, 201);
        `;
    }}
    transition: background 1s cubic-bezier(0, 0.88, 0, 1.03);

    @media ${device.laptopL} {
        display: none;
    }
`;

const MyName = styled.div<{ $scrollOver: boolean; $darkMode: boolean }>`
    color: rgb(182, 190, 201);
    font-family: 'Montserrat';
    font-weight: bold;
    color: ${({ $scrollOver, $darkMode }) =>
        ScrollOverColor({ $scrollOver, $darkMode })};
`;

const UiStyle = styled.ul`
    display: flex;
    align-items: center;
`;

export default function RootNav() {
    const login = useStore(state => state.userAuth.login);
    const darkMode = useStore(state => state.darkMode);

    const { pathname } = useLocation();
    const [active, setActive] = useState<string>(pathname);
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const { scrollOver } = useScrollY(430);
    const { mutateAsync } = useLogout();

    const location = useLocation();

    const navigate = useNavigate();
    const openLoginPopup = () => setLoginModal(true);

    return (
        <>
            {/* TopButton */}
            <TopButton />

            {/* Alert */}
            {loginModal && (
                <Popup type={'Login'} closePopup={() => setLoginModal(false)}>
                    <LoginForm />
                </Popup>
            )}

            <Header
                $scrollOver={scrollOver}
                $path={location.pathname === '/'}
                $darkMode={darkMode}
            >
                <Grid>
                    <nav>
                        {' '}
                        <MyName
                            $scrollOver={scrollOver}
                            $darkMode={darkMode}
                            onClick={() => navigate('/')}
                        >
                            PHM{`'`} Portpolio .
                        </MyName>
                        {/* Nav */}
                        <ul>
                            {NAVPAGE_OBJECT.map((e, idx) => (
                                <List
                                    key={idx}
                                    $active={active === e.path}
                                    $scrollOver={scrollOver}
                                    $darkMode={darkMode}
                                    $path={location.pathname === '/'}
                                    onClick={() => {
                                        if (!e.AuthPage || login) {
                                            // AuthPage가 필요하면 로그인 확인
                                            setActive(e.path);
                                            navigate(e.path);
                                        }
                                    }}
                                >
                                    {e.pathName}
                                </List>
                            ))}
                        </ul>
                        <UiStyle>
                            <DarkModeBtn />
                            {/* login Component */}
                            {!login && (
                                <List
                                    $scrollOver={scrollOver}
                                    $darkMode={darkMode}
                                    onClick={openLoginPopup}
                                >
                                    로그인
                                </List>
                            )}

                            {login && (
                                <List
                                    $scrollOver={scrollOver}
                                    $darkMode={darkMode}
                                    onClick={() => mutateAsync()}
                                >
                                    로그아웃
                                </List>
                            )}
                        </UiStyle>
                    </nav>
                </Grid>
            </Header>
        </>
    );
}
