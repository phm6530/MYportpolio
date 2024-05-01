import FadeinComponent from 'FadeinComponent';
import styled from 'styled-components';

const NoSeachingData = styled(FadeinComponent)`
    text-align: center;
    height: 300px;
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
`;

const NonData = ({ message }) => {
    return <NoSeachingData>{message}</NoSeachingData>;
};

export default NonData;
