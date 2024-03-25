import { Spinner, Text } from '@chakra-ui/react';
import styled from 'styled-components';

const InfinityStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        margin-left: 1rem;
        font-weight: bold;
        font-size: 0.8rem;
    }
`;

const InfinityLoading = () => {
    return (
        <InfinityStyle>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="olive.200"
                color="olive.800"
                role="status"
                zIndex="9999"
                display={true}
            ></Spinner>
            <Text display={true}>Loading...</Text>
        </InfinityStyle>
    );
};

export { InfinityLoading };
