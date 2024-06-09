import DashBoard from 'component/ui/DashBoard/DashBoard';

// import UserProfile from 'component/profile/UserProfile';
import ProjectRoutes from 'Route/ProjectRoutes';

import { Grid, PageWrapper } from '@layout/Grid';
import styled from 'styled-components';
// import Motion from 'component/animations/Motion';

const FullWidthGrid = styled(Grid)`
    width: 100%;
`;

export default function Project() {
    console.log('프로젝트 랜더링');
    return (
        <PageWrapper>
            <DashBoard
                pageTitle={'PROJECT'}
                subComment={'저의 프로젝트를 기록합니다.'}
            />

            <FullWidthGrid>
                {/* Common */}
                {/* <Motion.FadeInOut>
                    <UserProfile />
                </Motion.FadeInOut> */}

                {/* Route  */}
                <ProjectRoutes />
            </FullWidthGrid>
        </PageWrapper>
    );
}
