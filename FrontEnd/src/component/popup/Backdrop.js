import styled from 'styled-components';

const BackdropStyle = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #1d1d1da3;
    z-index: 2;
    top: 0;
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    left: 0;
`;

const BackDrop = () => {
    return <BackdropStyle />;
};

export default BackDrop;
