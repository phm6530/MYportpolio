import styled, { css } from 'styled-components';
import SKILL_ICON from '../../../../../component/icon/StackIcon';
import Fadein from '../../../../../FadeinComponent';

// icon
import { CiCalendar } from 'react-icons/ci';

import { Button } from '../../../../../component/ui/Button';
import ProjectItemHeader from 'features/project/component/ProjectItemHeader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const ProjectDuration = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
`;

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
    /* &:after {
        position: absolute;
        content: '01';
        left: 50%;
        top: -30px;
        font-size: 3rem;
        opacity: 0.2;
        font-weight: bold;
    } */

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
    /* &::after {
        position: absolute;
        content: '01';
        left: -29px;
        background: linear-gradient(to right, #775ec2, #6672c4);
        top: -9px;
        padding: 0.3rem 2rem;
        padding-top: 1rem;
        color: #fff;
        transform: rotate(-45deg);
    } */
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

const ProjectButtonWrap = styled.div``;

export default function ProjectItem({ activeIdx, setActiveIdx, project }) {
    const { thumbnail, skill, company, hashtag, title, description, project_key } = project;
    const navigate = useNavigate();

    return (
        <>
            <ProjectFadeinStyle onClick={() => navigate(`${project_key}`)}>
                <ProjectImgArea $backImg={`http://localhost:8080/${thumbnail}`} className="projectItemImg">
                    <ViewIconAnimation className="aniTarget">
                        <FaMagnifyingGlass />
                    </ViewIconAnimation>

                    {/* <img src={} alt={title} /> */}
                </ProjectImgArea>

                <ContentsWrap>
                    {/* Header */}
                    <ProjectCompany>{company}</ProjectCompany>

                    {/* <ProjectSubTitle>기술스택</ProjectSubTitle> */}
                    <ProjectItemHeader
                        activeIdx={activeIdx === project.id}
                        setActiveIdx={setActiveIdx}
                        project={project}
                    />

                    {/* Company */}

                    <ProjectDescription>{description}</ProjectDescription>
                    <div>
                        {hashtag &&
                            hashtag.map((e, idx) => (
                                <HashtageStyle className="hashTag" key={`hash-${idx}`}>
                                    # {e}
                                </HashtageStyle>
                            ))}
                    </div>
                    {/*                             
                                <ProjectSubTitle>프로젝트 기간</ProjectSubTitle>

                                <ProjectDuration>
                                    <CiCalendar/>
                                    {project.startProject} - {project.endProject}
                                </ProjectDuration> */}

                    <ProjectButtonWrap>
                        {/* <Button.Type onClick={() => projectView(project_url)}>VIEW</Button.Type> */}
                        {/* <Button.Type onClick={() => navigate(`${project_key}`)}>More</Button.Type> */}
                    </ProjectButtonWrap>
                </ContentsWrap>
            </ProjectFadeinStyle>
        </>
    );
}
