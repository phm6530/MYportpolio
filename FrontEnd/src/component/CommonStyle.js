import styled from 'styled-components';

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* flex-grow: 1; */
    width: 100%;
`;

const HashTag = styled.div`
    align-items: center;
    display: inline-flex;
    font-weight: 500;
    font-size: 11px;
    padding: 2px 7px;
    border-radius: 11px;
    color: var(--color-hash-tag-text);
    background: var(--color-hash-tag-background);
    margin-right: 0.6rem;
    align-items: center;
    font-weight: bold;
    margin-bottom: 0.3rem;
    svg {
        margin-left: 0.4rem;
    }
`;

export { FlexRow, HashTag };
