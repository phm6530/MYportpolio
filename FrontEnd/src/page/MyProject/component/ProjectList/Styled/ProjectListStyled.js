import styled from 'styled-components';

const PageSubText = styled.div`
    font-size: 20px;
    margin-bottom: 70px;
    background: #fff;
    padding: 2rem;

    p {
        font-size: 14px;
        color: #fff;
        opacity: 0.7;
        padding-top: 20px;
    }
`;
const ProjectWrapStyle = styled.div`
    flex-direction: column;
    flex-wrap: wrap;
    border-radius: 1em;
    background: #fff;
    flex-grow: 1;
    overflow: hidden;
`;

export { PageSubText, ProjectWrapStyle };
