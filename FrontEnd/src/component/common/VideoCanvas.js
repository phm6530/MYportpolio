import styled from 'styled-components';

const BackGroundVideo = styled.div`
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    video {
        width: 100%;
    }
    &::after {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
        /* background: linear-gradient(to left, #00000029, #0b0c11, #0000004d); */
    }
`;

function VideoCanvas() {
    return (
        // <></>
        <BackGroundVideo>
            <video autoPlay loop muted>
                <source src="/img/bg.mp4" type="video/mp4" />
            </video>
        </BackGroundVideo>
    );
}

export default VideoCanvas;
