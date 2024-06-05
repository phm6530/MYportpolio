import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopButton from 'component/ui/TopButton';
import useStore from 'store/zustandStore';
import useScrollY from '@hooks/useScrollY';
import { Grid } from '@layout/Grid';
import * as S from '@layout/RootNavStyle';
import DrawerMenu from 'component/ui/DrawerMenu';
import RootNavList from '@layout/RootNavList';

export default function RootNav() {
    const darkMode = useStore(state => state.darkMode);
    const { scrollOver } = useScrollY(430);
    const location = useLocation();
    const navigate = useNavigate();

    // 햄버거 메뉴 + draw 여부
    const [drawerView, setDrawerView] = useState<boolean>(false);

    useEffect(() => {
        setDrawerView(false);
    }, [location.pathname]);

    return (
        <>
            {/* TopButton */}
            <TopButton />

            <S.Header
                $scrollOver={scrollOver}
                $path={location.pathname === '/'}
                $darkMode={darkMode}
            >
                <Grid>
                    <S.Nav>
                        {' '}
                        <S.MyName
                            $scrollOver={scrollOver}
                            $darkMode={darkMode}
                            onClick={() => navigate('/')}
                        >
                            PHM{`'`} Portpolio .
                        </S.MyName>{' '}
                        {/* 햄버거 메뉴 */}
                        <DrawerMenu
                            drawerView={drawerView}
                            setDrawerView={setDrawerView}
                        />
                        {/* Nav */}
                        <RootNavList
                            drawerView={drawerView}
                            scrollOver={scrollOver}
                        />
                    </S.Nav>
                </Grid>
            </S.Header>
        </>
    );
}
