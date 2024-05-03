import DashBoard from 'component/ui/DashBoard';
import BannerCommon from 'component/ui/BannerCommon';
import DashBoardTitle from 'component/ui/DashBoardTitle';

import UserProfile from 'component/profile/UserProfile';
import ProjectRoutes from 'Route/ProjectRoutes';

import { PageGrid } from 'component/ui/Grid';

export default function MyProject() {
    return (
        <>
            <DashBoard>
                <BannerCommon.BannerPoint>
                    <img src="/img/developer.png" alt="developer" />
                    My Project
                </BannerCommon.BannerPoint>
                <DashBoardTitle>
                    <b>PROJECT</b>
                </DashBoardTitle>
            </DashBoard>

            <PageGrid>
                <UserProfile />

                {/* Route  */}
                <ProjectRoutes />
            </PageGrid>
        </>
    );
}
