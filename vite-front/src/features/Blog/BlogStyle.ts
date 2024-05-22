import styled from 'styled-components';

const Tab = styled.div`
    margin-right: 3rem;
    padding-right: 2rem;
`;

const Contents = styled.div`
    width: 100%;
`;

const BoardWrapper = styled.div`
    height: 100%;
    display: flex;

    width: 100%;
    transition: all 0.5s ease;
    background: ${({ theme }) => theme.backgroundColor};
    padding: 2rem 2rem;
    border-radius: 2rem;
    min-height: 300px;
`;

export { Tab, Contents, BoardWrapper };
