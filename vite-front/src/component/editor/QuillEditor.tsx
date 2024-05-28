import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

import styled from 'styled-components';
import { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import alertThunk from 'store/alertTrunk';
import { uploadImage } from 'services/uploadService';
import { ENDPOINT_URL } from 'constants/apiUrl';

const EditorStyle = styled.div`
    /* padding: 2rem 0; */
`;

const ReactQuillStyle = styled(ReactQuill)`
    /* background: var(--color-background-input); */

    .ql-editor {
        min-height: 500px !important;
        line-height: 1.8 !important;
        font-family: 'Poppins', 'SUIT-Regular', sans-serif;
        font-size: 16px !important;
    }
    .ql-align-center {
        text-align: center;
        img {
            display: block;
            margin: auto;
        }
    }
`;

const QuillEditor = ({ PROJECT_KEY, ...props }) => {
    const quillRef = useRef(null);
    const dispatch = useDispatch();

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('img', file);
            formData.append('type', 'editor');

            try {
                const { fileUrl: imgUrl } = await uploadImage(
                    formData,
                    PROJECT_KEY,
                );
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();

                if (range) {
                    editor.insertEmbed(
                        range.index,
                        'image',
                        `${ENDPOINT_URL}/${imgUrl}`,
                    );
                    editor.insertText(range.index + 1, '\n');
                    editor.setSelection(range.index + 2, 0);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                dispatch(alertThunk(error.message, 0));
            }
        });
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: '#toolbar',
                handlers: {
                    image: handleImageUpload,
                },
            },
        }),
        [],
    );

    return (
        <EditorStyle>
            <ReactQuillStyle modules={modules} ref={quillRef} {...props} />
        </EditorStyle>
    );
};

export default QuillEditor;
