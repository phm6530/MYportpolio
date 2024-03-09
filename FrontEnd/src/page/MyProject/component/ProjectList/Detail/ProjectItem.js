import styled from 'styled-components';
import SKILL_ICON from '../../../../../component/icon/StackIcon';
import Fadein from '../../../../../FadeinComponent';

// icon
import { CiCalendar } from 'react-icons/ci';

import { Button } from '../../../../../component/ui/Button';
import ProjectItemHeader from 'features/project/component/ProjectItemHeader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProjectDuration = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
`;

const ProjectFadeinStyle = styled(Fadein)`
    margin-bottom: 2rem;
    padding: 0 1rem;
    padding-bottom: 2rem;
    overflow: hidden;
    display: flex;
    align-items: start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    img {
        transition: all 0.5s ease;
    }
    &:hover {
        img {
            transform: scale(1.1);
        }
    }
`;

const ProjectImgArea = styled.div`
    width: 30%;
    height: 12.6rem;
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;

    .cateGory {
        background: red;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        padding: 0.2rem 0.7rem;
        color: #fff;
        background: #303441;
    }
`;
const ProjectSkillWrap = styled.div`
    display: flex;
    /* background: linear-gradient(to top, #0000008a, #00000021, #ffffff00); */
    /* position: absolute; */
    /* width: 100%; */
    bottom: 0;
    padding: 0.5rem;
    height: 50%;
    flex-direction: row;
    align-items: flex-end;
    span {
        text-shadow: 2px 5px 5px black;
    }
`;

// const ProjectSubTitle = styled.p`
//     font-weight: bold;
//     margin-top: 24px;
//     font-size: 14px;
// `

const ProjectCompany = styled.div`
    font-size: 12px;
    margin-bottom: 3px;
    color: rgba(113 113 122);
`;

const ProjectDescription = styled.div`
    font-size: 16px;
    white-space: pre-line;
    margin-bottom: 24px;
    color: #3d4757;
    line-height: 1.7rem;
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-items: flex-start;
    padding: 1rem 0.5rem 0.5rem 3rem;
    width: 65%;
    flex-grow: 1;
`;

const SkillStyle = styled.div`
    display: inline-block;
    color: #555969;
    border-radius: 18px;
    padding: 0.3rem 0.5rem;
    font-size: 0.7rem;
    font-weight: bold;
    margin-right: 0.6rem;
    color: rgb(75, 148, 250);
    background-color: rgb(235, 244, 255);
`;

const ProjectButtonWrap = styled.div``;

export default function ProjectItem({ activeIdx, setActiveIdx, project }) {
    const projectView = url => {
        window.open(url, '_blank');
    };

    const { thumbnail, skill, company, description, project_url, project_key } = project;

    const navigate = useNavigate();

    return (
        <>
            <ProjectFadeinStyle>
                <ProjectImgArea>
                    <img src={`http://localhost:8080/${thumbnail}`} alt="jkl" />
                    <div className="cateGory">참여율 100%</div>
                    {/* <ProjectSkillWrap></ProjectSkillWrap> */}
                </ProjectImgArea>

                <ContentsWrap>
                    {/* Header */}
                    <ProjectCompany>{company}</ProjectCompany>

                    <ProjectItemHeader
                        activeIdx={activeIdx === project.id}
                        setActiveIdx={setActiveIdx}
                        project={project}
                    />

                    {/* Company */}

                    <div>
                        <ProjectDescription>{description}</ProjectDescription>
                        {skill && skill.map((e, idx) => <SkillStyle>{e}</SkillStyle>)}

                        {/* <ProjectSubTitle>기술스택</ProjectSubTitle> */}
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
