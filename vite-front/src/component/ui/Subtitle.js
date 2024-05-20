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
        flex-grow: 1;
        font-family: 'Poppins';
        display: flex;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: space-between;
        .point {
            background: var(--gradient-title-color);
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
