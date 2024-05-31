import 'quill/dist/quill.snow.css';

import { useNavigate } from 'react-router-dom';

import { HiMiniLink } from 'react-icons/hi2';
import { Button } from 'component/ui/Button';
import { HashTag } from '@style/commonStyle';
import QuillView from 'component/editor/QuillView';
import ProjectDetailControlsWrap from '@features/project/ProjectDetailControls/ProjectDetailControlsWrap';
import {
    ProjectThumbNail,
    CustumStyle,
    ProjectSummary,
    ProjectViewFooter,
    SkillWrapper,
    HashtagArea,
    SKill,
    SummaryType,
    SummaryWrapper,
    SummaryWrap,
    ProjectTitle,
    ProjectSkillStyle,
    ProjectDescription,
} from '@features/project/ProjectDetailStyle';
import { ProjectPostProps } from '@type/ProjectTypes';
import { ENDPOINT_URL } from 'constants/apiUrl';
import styled from 'styled-components';

import ProjectNextPrevNav from '@features/project/ProjectNextPrevNav';
const DepsProjectSummary = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const ProjectDetail: React.FC<ProjectPostProps> = props => {
    const navigate = useNavigate();

    const {
        projectKey,
        title,
        company,
        skill,
        hashtag,
        startDate,
        projectUrl,
        description,
        endDate,
        projectDescription,
        thumbnail,
    } = props;

    const projectView = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <CustumStyle>
                <ProjectSummary>
                    <ProjectTitle>
                        {title}

                        {/* 버튼 wrapper */}
                        {projectKey && (
                            <ProjectDetailControlsWrap
                                projectKey={projectKey}
                            />
                        )}
                    </ProjectTitle>
                    <ProjectDescription>{description}</ProjectDescription>
                    <HashtagArea>
                        {hashtag.map((e: string, idx: number) => {
                            return (
                                <HashTag
                                    className="hashTag"
                                    key={`hash-${idx}`}
                                >{`# ${e}`}</HashTag>
                            );
                        })}
                    </HashtagArea>
                </ProjectSummary>{' '}
                <DepsProjectSummary>
                    <ProjectThumbNail>
                        <img src={`${ENDPOINT_URL}/${thumbnail}`} alt={title} />
                    </ProjectThumbNail>

                    <SummaryWrap>
                        <SummaryWrapper>
                            <SummaryType>클라이언트</SummaryType>
                            <div className="project_date">
                                <SKill>{company}</SKill>
                            </div>
                        </SummaryWrapper>
                        <SummaryWrapper>
                            <SummaryType>프로젝트 기간</SummaryType>

                            <div className="project_date">
                                <SKill>
                                    {startDate?.toString()} ~{' '}
                                    {endDate?.toString()}
                                </SKill>
                            </div>
                        </SummaryWrapper>
                        <SummaryWrapper>
                            <SummaryType>사용스킬 </SummaryType>
                            <SkillWrapper>
                                {skill.map((e: string, idx: number) => {
                                    // 첫 문자를 대문자로 변환하고 나머지 문자열과 이어붙입니다.
                                    const fullString =
                                        e.charAt(0).toUpperCase() + e.slice(1);
                                    return (
                                        <ProjectSkillStyle
                                            $skill={fullString}
                                            key={idx}
                                        >
                                            {fullString}
                                        </ProjectSkillStyle>
                                    );
                                })}
                            </SkillWrapper>
                        </SummaryWrapper>
                        <SummaryWrapper>
                            <SummaryType>Site Url </SummaryType>
                            <div
                                className="project_date"
                                onClick={() => projectView(projectUrl)}
                            >
                                <SKill
                                    $url={true}
                                    style={{ alignItems: 'center' }}
                                >
                                    <HiMiniLink />
                                    {projectUrl}
                                </SKill>
                            </div>
                        </SummaryWrapper>
                    </SummaryWrap>
                </DepsProjectSummary>{' '}
                {/* quill-view */}
                <QuillView contents={projectDescription} />{' '}
                <Button.Submit onClick={() => navigate('/project')}>
                    목록으로
                </Button.Submit>{' '}
            </CustumStyle>{' '}
            <ProjectViewFooter>
                ※ 본 게시물은 상업적 목적이 아닌 포트폴리오 목적으로만
                사용됩니다. 아직 공개되지 않은 작업물은 포함하지 않으며, 오직
                공개된 작업물만을 게시합니다.
            </ProjectViewFooter>
            <ProjectNextPrevNav />
        </>
    );
};

export default ProjectDetail;
