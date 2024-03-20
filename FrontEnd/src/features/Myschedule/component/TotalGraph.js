import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { filterByDate } from './filterByOrder';
import { TodaySeletor } from 'utils/TodaySeletor';
import { PercentCalculator } from 'utils/Calculator';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const TotalGraph = props => {
    const { arrState } = props;
    const counterRef = useRef(null);

    const values = Object.values(arrState);
    const weekArr = () => {
        let arr = [];
        values.forEach(item => {
            arr = arr.concat(item);
        });
        return {
            arr,
            test: () => {
                return arr.length;
            },
        };
    };
    const { arr, test } = weekArr(arrState);
    const { result, completeCount } = PercentCalculator(arr);

    useEffect(() => {
        gsap.to('.circular-pbar', {
            '--p': `${result}%`,
            duration: 3,
            ease: 'expo.out',
        });

        // GSAP 애니메이션: 숫자 증가
        if (counterRef.current) {
            gsap.fromTo(
                counterRef.current,
                { innerHTML: 0 }, //시작
                {
                    innerHTML: result, //최종상태
                    duration: 3, //걸리는 시간임
                    ease: 'power1.out', //가속도 조정 이건 공식문서 확인 ㄱㄱ
                    roundProps: 'innerHTML', //innerHTMl가 올라간다라는 소리
                    snap: { innerHTML: 1 }, //1단위로 스냅한다는 뜻
                },
            );
        }
    }, [result]);

    return (
        <Wrap>
            <div className="circular-pbar">
                <div className="circular-pbar-counter">
                    <span ref={counterRef}></span>%
                </div>
            </div>
            전체 {test()} 완료 {completeCount}
        </Wrap>
    );
};

export default TotalGraph;
