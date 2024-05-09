import styled from 'styled-components';

const QuillContainer = styled.div`
    width: 100%;
    border: 0 !important;
    font-size: 14px; //기존 텍스트 사이즈
    .ql-editor {
        padding: 0;
        line-height: 1.8 !important;
        font-family: 'Poppins', 'SUIT-Regular', sans-serif;
    }
`;

const QuillView = ({ contents }) => {
    const renderHTML = quillHTML => {
        return { __html: quillHTML };
    };

    return (
        <>
            <QuillContainer className="ql-container ql-snow">
                <div
                    id="quill_Editor"
                    className="ql-editor"
                    dangerouslySetInnerHTML={renderHTML(contents)}
                ></div>
            </QuillContainer>
        </>
    );
};

export default QuillView;
