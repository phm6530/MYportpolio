import styled, { css } from 'styled-components';

const getTextAreaStyles = props => {
    // console.log('props:::', props.$complete);
    return `
    transition: color 0.2s ease;
    ${
        props.$complete &&
        css`
            color: rgba(0, 0, 0, 0.4);
            text-decoration: line-through;
        `
    }
`;
};

const getDdayAreaStyles = props => `
    ${
        props.$Dday &&
        css`
            display: flex;
            align-items: flex-start;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            border: 1px solid #cdcdcd;
            border-radius: 1rem;
            box-shadow:
                26px 32px 15px 5px rgb(16 16 16 / 14%),
                inset 0 -2px 0 0 rgb(243 231 249 / 36%);
            padding: 1rem;
            margin-bottom: 4rem;
        `
    }
`;

const DdayImportantStyle = styled.span``;

const TextArea = styled.textarea`
    font-size: 14px;
    width: 100%;
`;

const ImportantStyle = styled.span`
    font-size: 12px;
    margin-top: 2px;
    img {
        width: 17px;
        margin-right: 10px;
        filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.3));
    }
`;

const FormStyle = styled.form`
    display: flex;
    flex-grow: 1;
    textarea {
        flex-grow: 1;
        background: transparent;
    }
`;

const IsComplete = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    svg {
        opacity: 0.8;
    }
    textarea {
        resize: none;
        ${props => getTextAreaStyles(props)}
    }
    ${props => getDdayAreaStyles(props)}
`;

export { FormStyle, ImportantStyle, IsComplete, TextArea, DdayImportantStyle };
