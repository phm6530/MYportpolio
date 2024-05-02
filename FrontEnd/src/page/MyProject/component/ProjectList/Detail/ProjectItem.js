import styled, { css } from 'styled-components';
import Fadein from '../../../../../FadeinComponent';

// icon
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const ProjectFadeinStyle = styled(Fadein)`
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 0 0 calc(33.333% - 1.34rem);
    width: 100%;
    align-items: start;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.04); */
    cursor: pointer;
    margin-right: 2rem;
    &:nth-child(3n + 2) {
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
    height: 10.6rem;
    position: relative;
    overflow: hidden;
    border-radius: 0.3rem;
    transition: all 0.5s ease;
    margin-right: 3rem;
    ${props =>
        props.$backImg &&
        css`
            background-image: url(${props.$backImg});
            background-size: 110%;
            background-position: center center;
        `}
`;

const ProjectCompany = styled.div`
    font-size: 12px;
    margin-bottom: 3px;
    color: rgba(113 113 122);
    display: none;
`;

const ProjectDescription = styled.div`
    font-size: 14px;
    white-space: pre-line;
    margin-bottom: 7px;
    color: #3d4757;
    line-height: 1.7rem;
    word-break: keep-all;
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* padding: 1rem 0.5rem 0.5rem 3rem; */
    /* width: 65%; */
    flex-grow: 1;
`;

const HashtageStyle = styled.div`
    font-size: 0.65rem;
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
const ProjectItemHeaderStyle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0.3rem;
    img {
        width: 15px;
    }
    margin-top: 1rem;
    font-size: 1rem;
    display: flex;
    letter-spacing: -0.7px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    color: ${({ theme }) => theme.textColor};
`;

export default function ProjectItem({ project }) {
    const { thumbnail, company, hashtag, description, project_key } = project;
    const navigate = useNavigate();

    return (
        <>
            <ProjectFadeinStyle onClick={() => navigate(`${project_key}`)}>
                <ProjectImgArea
                    $backImg={`http://localhost:8080/${thumbnail}`}
                    className="projectItemImg"
                >
                    <ViewIconAnimation className="aniTarget">
                        <FaMagnifyingGlass />
                    </ViewIconAnimation>

                    {/* <img src={} alt={title} /> */}
                </ProjectImgArea>

                <ContentsWrap>
                    {/* Header */}
                    <ProjectCompany>{company}</ProjectCompany>

                    <ProjectItemHeaderStyle>
                        {project.title}
                    </ProjectItemHeaderStyle>

                    {/* Company */}
                    <ProjectDescription>{description}</ProjectDescription>
                    <div>
                        {hashtag &&
                            hashtag.map((e, idx) => (
                                <HashtageStyle
                                    className="hashTag"
                                    key={`hash-${idx}`}
                                >
                                    # {e}
                                </HashtageStyle>
                            ))}
                    </div>
                </ContentsWrap>
            </ProjectFadeinStyle>
        </>
    );
}
