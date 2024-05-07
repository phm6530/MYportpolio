import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Fadein from 'FadeinComponent';

const ProjectFadeinStyle = styled(Fadein)`
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 0 0 calc(33.333% - 1.34rem);
    width: 100%;
    align-items: start;
    cursor: pointer;
    margin-right: 2rem;

    &:nth-child(3n) {
        margin-right: 0rem;
    }

    img {
        transition: all 0.2s ease;
    }
    &:hover {
        .projectItemImg {
            background-size: 120%;
        }
        .aniTarget {
            background: rgba(0, 0, 0, 0.3);
            svg {
                opacity: 1;
                transform: translateY(0px);
            }
        }
        img {
            transform: scale(1.1);
        }
    }
`;

const ProjectImgArea = styled.div`
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
    overflow: hidden;
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

const ProjectDescription = styled.div`
    font-size: 13px;
    white-space: pre-line;
    margin-bottom: 7px;
    color: ${({ theme }) => theme.descriptionColor};
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 표시할 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProjectItemHeaderStyle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
    img {
        width: 15px;
    }
    margin-top: 1rem;
    font-size: 1rem;
    display: flex;
    font-weight: bold;
    letter-spacing: -0.7px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    color: ${({ theme }) => theme.textColor};
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* padding: 1rem 0.5rem 0.5rem 3rem; */
    /* width: 65%; */
    flex-grow: 1;
`;

const ItemDate = styled.div`
    margin-top: 0.5rem;
    font-size: 12px;
    opacity: 0.5;
    font-weight: b;
`;

const hashTag = 'React';

const BlogItem = ({ item }) => {
    const { post_id, thumnail, post_title, description, date } = item;
    const navigate = useNavigate();

    return (
        <ProjectFadeinStyle onClick={() => navigate(`${post_id}`)}>
            <ProjectImgArea $backImg={thumnail} className="projectItemImg">
                <ViewIconAnimation className="aniTarget">
                    <FaMagnifyingGlass />
                </ViewIconAnimation>
            </ProjectImgArea>

            <ContentsWrap>
                {/* Header */}

                <ProjectItemHeaderStyle>{post_title}</ProjectItemHeaderStyle>

                {/* Company */}
                <ProjectDescription>{description}</ProjectDescription>
                <div className="hashTag">{hashTag}</div>
                <ItemDate>{date}</ItemDate>

                {/* <div>
                    {hashtag &&
                        hashtag.map((e, idx) => (
                            <HashtageStyle
                                className="hashTag"
                                key={`hash-${idx}`}
                            >
                                # {e}
                            </HashtageStyle>
                        ))}
                </div> */}
            </ContentsWrap>
        </ProjectFadeinStyle>
    );
};

export default BlogItem;
