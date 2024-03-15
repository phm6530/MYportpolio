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
        opacity: 0.7;
        /* background: linear-gradient(to left, #7264ef, #7264ef, #dd8efc); */
    }
`;

function VideoCanvas() {
    return (
        // <></>
        <BackGroundVideo>
            <video autoPlay loop muted>
                <source src="/img/board/bg_video.mp4" type="video/mp4" />
            </video>
        </BackGroundVideo>
    );
}

export default VideoCanvas;
