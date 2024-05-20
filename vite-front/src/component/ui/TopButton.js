import styled, { keyframes } from 'styled-components';
import { GoMoveToTop } from 'react-icons/go';
import { useEffect, useState } from 'react';

const enabledAni = keyframes`
    from{
        bottom: 0;
    }
    to{
        bottom: 2rem;
    }
`;

const TopButtonStyle = styled.div`
    position: fixed;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: red;
    z-index: 9999;
    cursor: pointer;
    border-radius: 100%;
    background: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        font-size: 20px;
        color: #fff;
    }
    animation: ${enabledAni} 0.5s ease forwards;
`;
function debounce(func, wait) {
    let timeout;
    return function () {
        // "this"와 "arguments"에 대한 명시적 참조를 제거합니다.
        clearTimeout(timeout);
        // 화살표 함수는 상위 스코프의 "this"를 사용합니다.
        timeout = setTimeout(() => {
            func.apply(this, arguments);
        }, wait);
    };
}
export default function TopButton() {
    const [show, setShow] = useState(false);
    const TopButtonHadnler = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤을 부드럽게
    };

    useEffect(() => {
        const heightFunc = debounce(() => {
            const target = window.scrollY;
            if (target > 500) {
                setShow(true);
            } else {
                setShow(false);
            }
        }, 500); // 100ms 디바운싱 시간

        window.addEventListener('scroll', heightFunc);
        return () => {
            window.removeEventListener('scroll', heightFunc);
        };
    }, []);

    return (
        <>
            {show && (
                <TopButtonStyle $show={show} onClick={() => TopButtonHadnler()}>
                    <GoMoveToTop />
                </TopButtonStyle>
            )}
        </>
    );
}
