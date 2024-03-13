import styled from 'styled-components';

const IsComplete = styled.div`
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-start;

    padding: 0.3rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    svg {
        opacity: 0.8;
    }
    textarea {
        transition: color 0.2s ease;
        ${props => {
            return props.$complete && `color: rgba(0,0,0,0.4);     text-decoration: line-through;`;
        }}
    }
`;

const TextArea = styled.textarea`
    font-size: 14px;
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

const CompleteHandler = styled.button`
    width: 25px;
    border-radius: 5em;
    font-size: 14px;
    font-weight: bold;
`;

const FormStyle = styled.form`
    display: flex;
    flex-grow: 1;
    textarea {
        flex-grow: 1;
        background: transparent;
    }
`;

export { FormStyle, CompleteHandler, ImportantStyle, TextArea, IsComplete };
