import useLogout from '@features/auth/hooks/useLogout';
import DarkModeBtn from 'component/ui/DarkModeBtn';
import { NAVPAGE_OBJECT } from 'constants/routePath';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from 'store/zustandStore';
import LoginForm from '@features/auth/LoginForm'; // Component
import Popup from 'component/popup/Popup';
import * as S from '@layout/RootNavStyle';

const RootNavList: React.FC<{ drawerView: boolean; scrollOver: boolean }> = ({
    drawerView,
    scrollOver,
}) => {
    const login = useStore(state => state.userAuth.login);
    const darkMode = useStore(state => state.darkMode);

    const { pathname } = useLocation();
    const { mutateAsync } = useLogout();

    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [active, setActive] = useState<string>(pathname);

    const openLoginPopup = () => setLoginModal(true);
    const navigate = useNavigate();

    return (
        <>
            {/* Alert */}
            {loginModal && (
                <Popup type={'Login'} closePopup={() => setLoginModal(false)}>
                    <LoginForm />
                </Popup>
            )}
            <S.LinkWrapper $toggle={drawerView}>
                <S.UiStyle $link={true}>
                    {NAVPAGE_OBJECT.map((e, idx) => (
                        <S.List
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
                        </S.List>
                    ))}
                </S.UiStyle>
                <S.UiStyle>
                    {/* 다크모드 버튼 */}
                    <DarkModeBtn />
                    {/* login Component */}
                    {!login && (
                        <S.List
                            $scrollOver={scrollOver}
                            $darkMode={darkMode}
                            onClick={openLoginPopup}
                            not={true}
                            $logout={true}
                        >
                            로그인
                        </S.List>
                    )}
                    {login && (
                        <S.List
                            $scrollOver={scrollOver}
                            $darkMode={darkMode}
                            onClick={() => mutateAsync()}
                            not={true}
                            $logout={true}
                        >
                            로그아웃
                        </S.List>
                    )}{' '}
                </S.UiStyle>
            </S.LinkWrapper>
        </>
    );
};

export default RootNavList;
