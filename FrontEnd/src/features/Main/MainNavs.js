import { NavPageObject } from 'constants/pageConstacts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    border-radius: 10px;
    background: #373737;
    font-size: 30px;
    padding: 0 30px;
    font-weight: 700;
    font-family: 'Poppins';
    font-style: normal;
    border: 3px solid transparent;
    span {
        color: #898989;
    }
`;

const MainNavsContainer = styled.div`
    margin-top: 1rem;
`;

const BtnGradient = styled.div`
    display: inline-block;
    padding: 3px;
    border-radius: 0.7rem;
    margin-right: 1rem;
    transition: all 0.5s ease-in;
    background: transparent;
    &:hover {
        background: linear-gradient(
            295.14deg,
            #64c7ef 17.16%,
            #a9a5cc 50.35%,
            #8e9bfc 79.79%
        );
        span {
            background: linear-gradient(
                295.14deg,
                #64c7ef 17.16%,
                #a9a5cc 50.35%,
                #8e9bfc 79.79%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }
`;

const HomeNavBtn = ({ path, pathName }) => {
    const navigate = useNavigate();

    return (
        <BtnGradient>
            <Button onClick={() => navigate(path)}>
                <span>{pathName}</span>
            </Button>
        </BtnGradient>
    );
};

const MainNavs = () => {
    return (
        <MainNavsContainer>
            {NavPageObject.map(e => {
                return (
                    <HomeNavBtn
                        key={e.path}
                        path={e.path}
                        pathName={e.pathName}
                    />
                );
            })}
        </MainNavsContainer>
    );
};

export default MainNavs;
