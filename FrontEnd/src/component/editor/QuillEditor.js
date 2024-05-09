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
    font-size: 14px;
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

const QuillEditor = ({ PROJECT_KEY, ...props }) => {
    console.log({ ...props });
    const quillRef = useRef();
    const dispatch = useDispatch();

    // quill에서 사용할 모듈
    // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지

    // ReactQuill의 custom handler 내에서 이미지 업로드 처리
    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
            const file = input.files[0];
            const formData = new FormData(); // FormData 인스턴스 생성

            formData.append('img', file); // 'img' 필드에 파일 추가
            formData.append('type', 'editor');

            try {
                const { fileUrl: imgUrl } = await uploadImage(
                    formData,
                    PROJECT_KEY,
                );
                const editor = quillRef.current.getEditor();

                console.log(imgUrl);

                // 현재 커서의 위치를 가져옴
                const range = editor.getSelection();

                // 커서가 있는 위치에 이미지 삽입
                if (range) {
                    editor.insertEmbed(
                        range.index,
                        'image',
                        `${ENDPOINT_URL}/${imgUrl}`,
                    );
                    // 이미지 삽입 후 커서를 이동하는 로직은 경우에 따라 다를 수 있으므로,
                    // 정확한 커서 위치 조정이 필요하면 추가 로직을 구현해야 합니다.

                    // 이미지 바로 뒤에 줄 바꿈을 삽입
                    editor.insertText(range.index + 1, '\n');

                    // 커서를 줄 바꿈 뒤로 이동
                    editor.setSelection(range.index + 2, 0);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                dispatch(alertThunk(error.message, 0));
            }
        });
    };

    //게시판 형식 메모이제이션해서 매번 다시 할당되지 않도록 함
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: '#toolbar',
                handlers: {
                    image: handleImageUpload,
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

export default QuillEditor;
