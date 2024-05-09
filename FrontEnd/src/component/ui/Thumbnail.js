import styled from 'styled-components';

// icon
import { FaMagnifyingGlass } from 'react-icons/fa6';

const ThumNailContainer = styled.div`
    width: 100%;
    height: 12.6rem;
    position: relative;
    overflow: hidden;
    border-radius: 0.3rem;
    margin-right: 3rem;
    transition: all 0.5s ease;
    background-image: ${({ $backImg }) =>
        `url(${$backImg || '/img/blog/noImg.jpg'})`};
    background-size: 110%;
    background-position: center;
    overflow: hidden;
    border-radius: 1rem;
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
    border-radius: 1rem;

    svg {
        opacity: 0;
        transform: translateY(40px);
        font-size: 2rem;
        color: #fff;
        filter: drop-shadow(0px 0px 10px);
        transition: all 0.3s 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`;

const Thumbnail = ({ img }) => {
    console.log(img);
    return (
        <>
            <ThumNailContainer $backImg={img}>
                <ViewIconAnimation className="aniTarget">
                    <FaMagnifyingGlass />
                </ViewIconAnimation>
            </ThumNailContainer>
        </>
    );
};

export default Thumbnail;
