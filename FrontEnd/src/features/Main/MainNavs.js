import { NavPageObject } from 'constants/pageConstacts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    border-radius: 10px;
    background: #373737;
    font-size: 30px;
    padding: 0 20px;
    font-weight: 700;
    font-family: 'Poppins';
    font-style: normal;
    border: 3px solid transparent;
    span {
        color: Red;
    }
    &:hover span {
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
`;

const MainNavsContainer = styled.div`
    margin-top: 1rem;
`;

const HomeNavBtn = ({ path, pathName }) => {
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => navigate(path)}>
                <span>{pathName}</span>
            </Button>
        </>
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
