import { ENDPOINT_URL } from 'constants/apiUrl';
import styled from 'styled-components';

const QuillContainer = styled.div`
    width: 100%;
    border: 0 !important;
    font-size: 16px; //기존 텍스트 사이즈
    .ql-editor {
        min-height: 500px !important;
        padding: 0;
        line-height: 1.8 !important;
        font-family: 'Poppins', 'SUIT-Regular', sans-serif;
    }
`;

const QuillView: React.FC<{ contents: string }> = ({ contents }) => {
    const renderHTML = (quillHTML: string): { __html: string } => {
        return { __html: quillHTML };
    };

    const originalDomain = 'uploads/';
    const updatedContents = contents.replaceAll(
        originalDomain,
        `${ENDPOINT_URL}/uploads/`,
    );

    return (
        <>
            <QuillContainer className="ql-container ql-snow">
                <div
                    id="quill_Editor"
                    className="ql-editor"
                    dangerouslySetInnerHTML={renderHTML(updatedContents)}
                ></div>
            </QuillContainer>
        </>
    );
};

export default QuillView;
