import styled from 'styled-components';

const AnimationSection = styled.section`
    overflow: hidden;
    @keyframes animateBg {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background: #fff;
        border-radius: 50%;
        box-shadow:
            0 0 0 4px rgba(255, 255, 255, 0.1),
            0 0 0 8px rgba(255, 255, 255, 0.1),
            0 0 20px rgba(255, 255, 255, 0.1);
        animation: animate 3s linear infinite;
    }
    span::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 300px;
        height: 1px;
        background: linear-gradient(90deg, #fff, transparent);
    }
    @keyframes animate {
        0% {
            transform: rotate(315deg) translateX(0);
            opacity: 1;
        }
        70% {
            opacity: 1;
        }
        100% {
            transform: rotate(315deg) translateX(-1000px);
            opacity: 0;
        }
    }
    span:nth-child(1) {
        top: 0;
        right: 0;
        left: initial;
        animation-delay: 12s;
        animation-duration: 1s;
    }
    span:nth-child(2) {
        top: 0;
        right: 180px;
        left: initial;
        animation-delay: 5s;
        animation-duration: 2s;
    }
    span:nth-child(3) {
        top: 80;
        right: 0px;
        left: initial;
        animation-delay: 5s;
        animation-duration: 2s;
    }
`;

const ShootingStar = () => {
    return (
        <AnimationSection>
            <section>
                <span></span>
                <span></span>
                <span></span>
            </section>
        </AnimationSection>
    );
};

export default ShootingStar;
