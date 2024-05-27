import styled from 'styled-components';
import FadeinComponent from 'FadeinComponent';

export const NoSeachingData = styled(FadeinComponent)`
    text-align: center;
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
`;

export const ProjectListStyle = styled.div`
    flex-direction: row;
    border-radius: 1em;
    background: var(--color-background);
    flex-grow: 1;
    overflow: hidden;
    padding: 2rem 2rem;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    box-shadow: var(--box-shadow-style);
`;

export const FlexRow = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    align-items: center;
`;
