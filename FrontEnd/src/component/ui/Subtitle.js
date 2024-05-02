import styled from 'styled-components';

const SubTitleStyle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    /* margin-bottom: 1.5rem; */
    align-items: center;
    .subText {
        font-size: 2rem;
        line-height: 1.1em;
        font-weight: bold;
        color: #333333;
        flex-grow: 1;
        font-family: 'Poppins';
        display: flex;
        align-items: center;
        .point {
            background: linear-gradient(to left, #7264ef, #7264ef, #dd8efc);
            color: transparent;
            background-clip: text;
            margin-right: 0.5rem;
        }
    }
    img {
        width: 35px;
        margin-right: 10px;
    }
`;

const BigSubTitleStyle = styled.div``;

export default function SubTitle({ className, children }) {
    return <SubTitleStyle className={className}>{children}</SubTitleStyle>;
}

export function BigSubTitle({ children }) {
    return <BigSubTitleStyle>{children}</BigSubTitleStyle>;
}
