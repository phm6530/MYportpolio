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
    width: 100%;
`;

const SubTitleTextStyle = styled.span`
    font-size: 14px;
    line-height: 17px;
    color: #4f5067;
    justify-content: space-between;
    font-size: 14px;
    letter-spacing: -0.05em;
    font-weight: 500;
    display: flex;
    margin-bottom: 0.7rem;
    align-items: center;
    color: #8d93ac;
    width: 100%;
    align-items: center;
    position: relative;
`;

const MarginBottom1rem = styled.div`
    margin-bottom: 1rem;
`;

const FlexColumnBetween = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
`;

export {
    FlexColumnBetween,
    SubTitleTextStyle,
    FlexRowDiv,
    FlexColumnDiv,
    FlexWrapDiv,
    MarginBottom1rem,
};
