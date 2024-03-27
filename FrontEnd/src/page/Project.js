import styled from 'styled-components';
import { Outlet, useLocation, useOutlet } from 'react-router-dom';
import UserProfile from 'component/profile/UserProfile';
import Motion from 'component/animations/Motion';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ProjectWrap = styled.div`
    display: flex;
`;
const SubAnimatedOutlet = () => {
    const o = useOutlet();
    const [outlet] = useState(o);

    return <>{outlet}</>;
};

export default function Project() {
    const { pathname } = useLocation();
    const location = useLocation();
    const locationArr = location.pathname?.split('/') ?? [];

    console.log(locationArr);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 부드러운 스크롤 효과 적용
        });
    }, [pathname]);

    return (
        <>
            {/* Wrap */}

            <ProjectWrap>
                <UserProfile />
                {/* <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.6, -0.05, 0.01, 0.99], // 예시 큐빅 베지어 값
                        }}
                    > */}
                <Outlet />
                {/* </motion.div>
                </AnimatePresence> */}
            </ProjectWrap>
        </>
    );
}
