import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const CircleGraph = styled.div`
    /* Ellipse 31 */

    box-sizing: border-box;

    width: 150px;
    height: 150px;
    border-radius: 100%;
    background: ${props => {
        return `conic-gradient(
            from 180deg at 50% 50%,
            #fff ${360 - props.percent * 3.6}deg,
            #ec4dfb ${360 - props.percent * 3.6}deg 180deg
        )`;
    }};

    border: 3px solid #ffffff;
    position: relative;
    &::after {
        position: absolute;
        content: '${props => props.num}%';
        width: 80%;
        height: 80%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 50%;
    }
`;

const TotalGraph = () => {
    const percent = 70;
    // const [test, setTest] = useState();
    // const [num, setNum] = useState(0);

    // // console.log(test);
    // console.log(num);
    // useEffect(() => {
    //     let cnt = 0;
    //     const interval = setInterval(() => {
    //         if (cnt < percent) {
    //             setTest(cnt);
    //             cnt++;
    //             setNum(prev => prev + 1);
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, 20);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);
    const counterRef = useRef(null); // DOM 요소 참조를 위한 ref

    useEffect(() => {
        gsap.to('.circular-pbar', {
            '--p': `${percent}%`,
            duration: 4,
            ease: 'expo.out',
        });

        // GSAP 애니메이션: 숫자 증가
        if (counterRef.current) {
            gsap.fromTo(
                counterRef.current,
                { innerHTML: 0 }, //시작
                {
                    innerHTML: percent, //최종상태
                    duration: 4, //걸리는 시간임
                    ease: 'power1.out', //가속도 조정 이건 공식문서 확인 ㄱㄱ
                    roundProps: 'innerHTML', //innerHTMl가 올라간다라는 소리
                    snap: { innerHTML: 1 }, //1단위로 스냅한다는 뜻
                },
            );
        }
    }, []);

    return (
        <>
            <div className="circular-pbar">
                <div className="circular-pbar-counter">
                    <span ref={counterRef}></span>%
                </div>
            </div>
        </>
    );
};

export default TotalGraph;
