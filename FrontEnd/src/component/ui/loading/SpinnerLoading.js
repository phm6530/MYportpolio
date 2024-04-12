import styled from 'styled-components';

const SpinnerStyle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    p {
        margin-left: 1rem;
        font-weight: bold;
        font-size: 0.8rem;
    }
`;

const SpinnerLoading = () => {
    return (
        <SpinnerStyle>
            {/* <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="olive.200"
                color="olive.800"
                role="status"
                zIndex="9999"
                display={true}
            ></Spinner>
            <Text display={true}>Loading...</Text> */}
        </SpinnerStyle>
    );
};

export { SpinnerLoading };
