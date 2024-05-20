import React, { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일시트 임포트

const CustomToolbar = () => (
    <div id="toolbar">
        <span className="ql-formats">
            <select className="ql-font" defaultValue="arial">
                <option value="arial">Arial</option>
                <option value="buri">Buri</option>
                <option value="gangwon">Gangwon</option>
            </select>
            <select className="ql-size" defaultValue="medium">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="TiTle">Title</option>
            </select>
            <select className="ql-header">
                <option value="1">Header 1</option>
                <option value="2">Header 2</option>
                <option value="3">Header 3</option>
                <option value="4">Header 4</option>
                <option value="5">Header 5</option>
                <option value="6">Header 6</option>
            </select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
            <button className="ql-blockquote" />
        </span>
        <span className="ql-formats">
            <select className="ql-color" />
            <select className="ql-background" />
        </span>

        <span className="ql-formats">
            <button className="ql-image" />
            <button className="ql-video" />
        </span>

        <span className="ql-formats">
            <button className="ql-clean" />
        </span>
    </div>
);

export default function Editor() {
    // 커스텀 버튼의 클릭 핸들러
    function handleCustomButtonClick() {
        console.log('커스텀 버튼 클릭됨!');
        // 여기에 커스텀 버튼 클릭 시 실행할 로직 추가
    }

    useEffect(() => {
        const quillCustum = document.querySelector('.ql-custum-style');
        quillCustum.addEventListener('click', handleCustomButtonClick);
    }, []);

    return (
        <div style={{ paddingTop: 100 }}>
            <CustomToolbar />
            <ReactQuill
                modules={{
                    toolbar: {
                        container: '#toolbar',
                        hanlders: {
                            image: handleCustomButtonClick,
                        }, // 커스텀 툴바 사용
                    },
                }}
            />
        </div>
    );
}
