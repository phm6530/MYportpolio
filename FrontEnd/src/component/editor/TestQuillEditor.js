import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useMemo, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { blogloadImage } from 'services/blogService';
import { toast } from 'react-toastify';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import 'highlight.js/styles/atom-one-dark.min.css';
const EditorStyle = styled.div`
    /* padding: 2rem 0; */
`;
const Toolbar = styled.div``;
const ReactQuillStyle = styled(ReactQuill)`
    /* background: var(--color-background-input); */
    .ql-toolbar {
        span,
        button,
        svg,
        path,
        line,
        polygon,
        rect,
        polyline {
            color: var(--quill-toolbar-color);
            stroke: var(--quill-toolbar-color) !important;
        }
        .ql-active span,
        .ql-active button,
        .ql-active svg,
        .ql-active path,
        .ql-active line,
        .ql-active polygon,
        .ql-active rect,
        .ql-active polyline {
            color: red;
            stroke: red !important;
        }
    }
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

const TestQuillEditor = ({ postKey, ...props }) => {
    const quillRef = useRef();
    console.log('postKey::', postKey);

    const { mutateAsync } = useMutation({
        mutationFn: blogloadImage,
        onSuccess: () => {
            toast.success('업로드됨');
        },
    });

    const previewImage = async file => {
        const formData = new FormData();

        const newFileName = file.name.replace(/[^\w.-]/g, '_');
        formData.append('image', file, newFileName); // 'img' 필드에 파일 추가

        //quill editor
        const editor = quillRef.current.getEditor();

        //커서위치 가져옴
        const range = editor.getSelection();
        if (range) {
            const result = await mutateAsync({
                test: 'test',
                key: postKey,
                formData,
            });
            console.log('result:::', result);

            editor.insertEmbed(range.index, 'image', `${result.imgUrl}`);
            editor.insertText(range.index + 1, '\n'); //뒤로 한칸가서 엔터 치기
            editor.setSelection(range.index + 2, 0); //마우커서는 엔터 뒤로
        }
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.click(); // 이미지 input 강제 트리거 시키는거

        input.addEventListener('change', async () => {
            const file = input.files[0];
            previewImage(file);
        });
    };

    hljs.configure({
        languages: [
            'javascript',
            'ruby',
            'python',
            'java',
            'cpp',
            'kotlin',
            'sql',
        ],
    });

    //게시판 형식 메모이제이션해서 매번 다시 할당되지 않도록 함
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'code-block'],
                    ['image'],
                    ['blockquote'],
                    // [({ list: 'ordered' }, { list: 'bullet' })],
                    // [{ script: 'sub' }, { script: 'super' }],
                    [
                        'align',
                        { align: 'center' },
                        { align: 'right' },
                        { align: 'justify' },
                    ],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            syntax: {
                highlight: text => hljs.highlightAuto(text).value,
                languages: hljs.registerLanguage('javascript', javascript),
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
