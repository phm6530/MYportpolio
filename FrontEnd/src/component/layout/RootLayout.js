import RootNav from './RootNav';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Footer from './Footer';

import { AnimatePresence } from 'framer-motion';

// import Timer from './Timer';

export default function RootLayout() {
    const { pathname } = useLocation();
    const [path, setPath] = useState(pathname);
    const [IDtimeOut, setIDTimeout] = useState(false);

    const [urlKey, setUrlkey] = useState();
    // 라우터 시에 최상단으로 이동

    // console.log('urlKey::::: ', urlKey);

    // useEffect(() => {
    //     const prevPath = ref.current.split('/')[1];
    //     const pagePath = pathname.split('/')[1];

    //     if (prevPath !== pagePath) {
    //         setUrlkey(pathname);
    //         console
    //     }

    //     ref.current = pathname;
    // }, [pathname]);

    // const wrapRef = useRef();
    // const navigate = useNavigate();

    // farmer-motion 으로 변경했음
    // const ChangePageHandler = path => {
    //     if (IDtimeOut) clearTimeout(IDtimeOut);
    //     if (pathname !== path) {
    //         wrapRef.current.classList.replace('loaded', 'unloaded');
    //     }

    //     const ID = setTimeout(() => {
    //         navigate(path);
    //         wrapRef.current.classList.replace('unloaded', 'loaded');
    //         setPath(path);
    //         setIDTimeout(false);
    //     }, 400);

    //     setIDTimeout(ID);
    // };
    const AnimatedOutlet = () => {
        const o = useOutlet();
        const [outlet] = useState(o);
        return <>{outlet}</>;
    };

    // URL에서 첫 번째 경로 세그먼트를 기반으로 key 값을 생성하는 함수

    return (
        <>
            {/* 로그인 팝업 */}
            {/* 24/1/13 - 하위컴포넌트 랜더링 문제가 있어서 변경함 */}

            {/* Common Nav */}
            <RootNav />
            {/* <Gird>
                <Timer/>
            </Gird> */}
            <AnimatePresence>
                <Outlet />
                {/* <AnimatedOutlet /> */}
            </AnimatePresence>
            {/* Footer */}
            <Footer />
        </>
    );
}

const loader = async ({ request }) => {
    const url = new URL(request.url);
    // url.pathname 등을 사용하여 필요한 로직 수행
    // 데이터를 로드하고 결과를 반환
    console.log(url);
    return { key: url };
};

export { loader };
