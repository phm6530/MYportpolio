import DashBoard from 'component/ui/DashBoard';

// import UserProfile from 'component/profile/UserProfile';
import ProjectRoutes from 'Route/ProjectRoutes';

import { PageGrid, PageWrapper } from '@layout/Grid';
// import Motion from 'component/animations/Motion';

export default function Project() {
    return (
        <PageWrapper>
            <DashBoard
                pageTitle={'PROJECT'}
                subComment={'저의 프로젝트를 기록합니다.'}
            />

            <PageGrid>
                {/* Common */}
                {/* <Motion.FadeInOut>
                    <UserProfile />
                </Motion.FadeInOut> */}

                {/* Route  */}
                <ProjectRoutes />
            </PageGrid>
        </PageWrapper>
    );
}
