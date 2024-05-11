import VideoCanvas from 'component/common/VideoCanvas';
import BannerCommon from 'component/ui/BannerCommon';
import DashBoard from 'component/ui/DashBoard';
import DashBoardTitle from 'component/ui/DashBoardTitle';
import { Grid } from 'component/ui/Grid';
import styled from 'styled-components';

const HomeContainer = styled.div`
    padding-top: 70px;
    height: calc(100vh + 72px);
`;

const Home = () => {
    return (
        <HomeContainer>
            <Grid>
                <DashBoardTitle>
                    <b>FRONTEND DEVELOPER</b>
                </DashBoardTitle>
                <DashBoardTitle>
                    <b>FRONTEND DEVELOPER</b>
                </DashBoardTitle>
            </Grid>
        </HomeContainer>
    );
};

export default Home;
