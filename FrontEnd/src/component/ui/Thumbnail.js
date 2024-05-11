import styled, { css } from 'styled-components';

// icon
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { HashTag } from 'component/CommonStyle';

const ThumbNailContainer = styled.div`
    width: 100%;
    height: 12.6rem;
    position: relative;
    overflow: hidden;
    border-radius: 0.3rem;
    margin-right: 3rem;
    transition: all 0.5s ease;
    background: #6f6f6f42;
    background-image: ${({ $backImg }) =>
        `url(${$backImg || '/img/blog/noimg.png'})`};
    background-size: 110%;
    background-position: center;
    overflow: hidden;
    border-radius: 0.3rem;
    border: 1px solid var(--borer-line-color);
    &:hover {
        background-size: 120%;
        .aniTarget {
            background: rgba(0, 0, 0, 0.3);
            svg {
                opacity: 1;
                transform: translateY(0px);
            }
        }
    }
`;

const ViewIconAnimation = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    z-index: 1;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0);
    transition: all 0.5s ease;

    svg {
        opacity: 0;
        transform: translateY(40px);
        font-size: 2rem;
        color: #fff;
        filter: drop-shadow(0px 0px 10px);
        transition: all 0.3s 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`;

const HasTagCustom = styled(HashTag)`
    position: absolute;
    background: #4131b3;
    font-weight: normal;
    top: 10px;
    left: 10px;
    font-size: 10px;
    border-radius: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    color: #fff;
`;

const Thumbnail = ({ className, img, badge }) => {
    return (
        <>
            <ThumbNailContainer
                className={className}
                $backImg={img}
                $badge={badge}
            >
                {/* <HasTagCustom>{badge}</HasTagCustom> */}
                <ViewIconAnimation className="aniTarget">
                    <FaMagnifyingGlass />
                </ViewIconAnimation>
            </ThumbNailContainer>
        </>
    );
};

export default Thumbnail;
