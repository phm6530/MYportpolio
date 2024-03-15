import styled from 'styled-components';

const FlexRowDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const FlexWrapDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
`;

const SubTitleTextStyle = styled.span`
    font-size: 14px;
    line-height: 17px;
    width: 100%;
    color: #4f5067;
    /* font-weight: bold; */
    display: flex;
    width: 100%;
    margin-bottom: 0.7rem;
    justify-content: space-between;
    span {
        opacity: 0.5;
    }
`;

const MarginBottom1rem = styled.div`
    margin-bottom: 1rem;
`;

const FlexColumnBetween = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

export { FlexColumnBetween, SubTitleTextStyle, FlexRowDiv, FlexColumnDiv, FlexWrapDiv, MarginBottom1rem };
