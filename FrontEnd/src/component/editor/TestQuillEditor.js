import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

import styled from 'styled-components';
import { useMemo, useRef } from 'react';

const EditorStyle = styled.div`
    /* padding: 2rem 0; */
`;

const ReactQuillStyle = styled(ReactQuill)`
    /* background: var(--color-background-input); */
    .ql-editor {
        min-height: 500px !important;
        line-height: 1.8 !important;
        font-family: 'Poppins', 'SUIT-Regular', sans-serif;
    }
    .ql-align-center {
        text-align: center;
        img {
            display: block;
            margin: auto;
        }
    }
`;

const TestQuillEditor = ({ setImgFile, ...props }) => {
    const quillRef = useRef();

    const previewImage = file => {
        //미리보기 생성
        var reader = new FileReader();
        reader.readAsDataURL(file);
        // 이벤트 핸들러를 readAsDataURL() 호출 전에 설정

        reader.onload = event => {
            const dataUrl = event.target.result;
            const editor = quillRef.current.getEditor();
            // 현재 커서의 위치를 가져옴
            const range = editor.getSelection();

            // 커서가 있는 위치에 이미지 삽입
            if (range) {
                editor.insertEmbed(range.index, 'image', `${dataUrl}`);
                // 이미지 삽입 후 커서를 이동하는 로직은 경우에 따라 다를 수 있으므로,
                // 정확한 커서 위치 조정이 필요하면 추가 로직을 구현해야 함.
                editor.insertText(range.index + 1, '\n');
                editor.setSelection(range.index + 2, 0);
            }
        };
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click(); // 이미지 input 강제 트리거 시키는거

        input.addEventListener('change', async () => {
            const file = input.files[0];
            previewImage(file);
            setImgFile(prev => [...prev, file]);
        });
    };

    //게시판 형식 메모이제이션해서 매번 다시 할당되지 않도록 함
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: '#toolbar',
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);

    return (
        <EditorStyle>
            {/* <SubTitle><span className='subText'>PROJECT - 내용</span></SubTitle> */}
            <ReactQuillStyle modules={modules} ref={quillRef} {...props} />
        </EditorStyle>
    );
};

export default TestQuillEditor;
