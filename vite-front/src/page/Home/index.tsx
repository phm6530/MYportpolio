import DashBoardTitle from 'component/ui/DashBoardTitle';
// import MainNavs from 'features/Main/MainNavs';
import ShootingStar from 'component/animations/ShootingStar';
import { Grid } from 'layout/Grid';
import styled, { keyframes } from 'styled-components';
import BlogNewPostList from 'features/Blog/BlogNewPostList/BlogNewPostList';
// import EmbosingButton from 'component/ui/EmbosingButton';
// import Icon from 'component/icon/Icon';

const infiniteBgAni = keyframes`
  0% {
    background-size: 100%;
  }
  100% {
    background-size: 120%;
  }
`;

const opacityAni = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const HomeContainer = styled.div`
    position: relative;
    padding-top: 13rem;
    padding-bottom: 5rem;
    overflow: hidden;
    background-image: url('/img/main.jpg');
    background-position: center bottom;
    background-repeat: no-repeat;

    animation: ${infiniteBgAni} 10s cubic-bezier(0.2, 0.56, 0.38, 0.41) infinite
        forwards alternate;
    background-size: cover;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(
            to right,
            rgba(11, 12, 17, 0.9),
            rgba(11, 12, 17, 0.8),
            rgba(0, 0, 0, 0.3)
        );
        z-index: 0;
        animation: ${opacityAni} 4s ease;
    }
`;

const Division = styled.span`
    color: #6e31e1;
    font-weight: 400;
    font-size: 50px;
`;

const CareerGoal = styled.div`
    margin-top: 40px;
    padding-top: 20px;
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    color: #d1d2eb;
    margin-bottom: 70px;
    position: relative;
    &::after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        border-top: 1px solid #898989;
        width: 20px;
    }
`;

const MainPoint = styled.div`
    background: var(--gradient-title-color);
    color: transparent;
    display: inline-block;
    background-clip: text;
    font-weight: 700;
    font-family: 'Inter';
    font-weight: bold;
    font-size: 25px;
`;

const CustomDashBoardTitle = styled(DashBoardTitle)`
    line-height: 6rem;
    font-size: 5.5rem;
`;

const TitleWrapper = styled.div`
    .mimoticon {
        position: absolute;
        width: 300px;
        right: 0;
        top: 20px;
    }
    #dashboardShadow {
        display: none;
    }
`;

// const MainButtonWrap = styled.div`
//     display: flex;

//     margin-right: 4rem;
// `;

const ButtomWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Home = () => {
    return (
        <HomeContainer>
            <ShootingStar />
            <Grid>
                <TitleWrapper>
                    <MainPoint>MY PORTPOLIO</MainPoint>
                    <CustomDashBoardTitle>PORTPOLIO</CustomDashBoardTitle>
                    <CustomDashBoardTitle>
                        WEB DEVELOPER<Division>&lt;/&gt;</Division>
                    </CustomDashBoardTitle>
                </TitleWrapper>
                <CareerGoal>
                    프론트엔드 개발자를 희망하고 있습니다. <br></br>
                    배운 모든 것을 기록하고 공유하는 것을 좋아합니다. 공유의
                    중요성을 잘 알기에 항상 새기고 실천하려고 노력합니다
                </CareerGoal>
                <ButtomWrapper>
                    {/* <MainButtonWrap>
                        <EmbosingButton>
                            <Icon
                                src="img/common/talk2.png"
                                alt="Talk"
                                width={40}
                            />
                            About me
                        </EmbosingButton>{' '}
                        <EmbosingButton>
                            {' '}
                            <Icon
                                src="img/common/talk2.png"
                                alt="Talk"
                                width={40}
                            />
                            Guest Board
                        </EmbosingButton>{' '}
                        <EmbosingButton>
                            {' '}
                            <Icon
                                src="img/common/talk2.png"
                                alt="Talk"
                                width={40}
                            />
                            Web Project
                        </EmbosingButton>
                    </MainButtonWrap> */}
                    <BlogNewPostList />
                </ButtomWrapper>
                {/* <MainNavs /> */}
                {/* <DashBoardTitle>
                    <b>FRONTEND DEVELOPER</b>
                </DashBoardTitle> */}
            </Grid>
        </HomeContainer>
    );
};

export default Home;
