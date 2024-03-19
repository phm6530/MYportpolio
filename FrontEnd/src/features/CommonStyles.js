import styled from 'styled-components';

const FlexRowDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: flex-start;
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
    justify-content: space-between;
    font-size: 14px;
    letter-spacing: -0.05em;
    font-weight: 500;
    color: #8d93ac;
    margin-bottom: 0.3rem;
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

export {
    FlexColumnBetween,
    SubTitleTextStyle,
    FlexRowDiv,
    FlexColumnDiv,
    FlexWrapDiv,
    MarginBottom1rem,
};
