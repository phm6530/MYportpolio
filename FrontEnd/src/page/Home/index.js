import DashBoardTitle from 'component/ui/DashBoardTitle';
import { Grid } from 'component/ui/Grid';
import MainNavs from 'features/Main/MainNavs';
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
                    <b>PORTPOLIO</b>
                </DashBoardTitle>
                <MainNavs />
                {/* <DashBoardTitle>
                    <b>FRONTEND DEVELOPER</b>
                </DashBoardTitle> */}
            </Grid>
        </HomeContainer>
    );
};

export default Home;
