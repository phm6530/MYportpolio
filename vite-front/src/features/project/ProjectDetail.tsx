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
    HashtagArea,
    SKill,
} from '@features/project/ProjectDetailStyle';
import { ProjectDetailProps } from '@type/ProjectTypes';

const ProjectDetail: React.FC<{ result: ProjectDetailProps }> = ({
    result,
}) => {
    const navigate = useNavigate();

    const {
        project_key: projectKey,
        title,
        company,
        skill,
        hashtag,
        startProject,
        project_url,
        endProject,
        project_description,
        thumbnail,
    } = result;

    const projectView = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <CustumStyle>
                <ProjectSummary>
                    <div className="title">
                        {title}
                        {/* 버튼 wrapper */}
                        <ProjectDetailControlsWrap projectKey={projectKey} />
                    </div>
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
                </ProjectSummary>
                <ProjectThumbNail>
                    <img
                        src={`http://localhost:8080/${thumbnail}`}
                        alt={title}
                    />
                </ProjectThumbNail>
                <ProjectViewFooter>
                    ※ 본 게시물은 상업적 목적이 아닌 포트폴리오 목적으로만
                    사용됩니다. <br></br>아직 공개되지 않은 작업물은 포함하지
                    않으며, 오직 공개된 작업물만을 게시합니다.
                </ProjectViewFooter>
                <ProjectSummary>
                    <div className="date">
                        <span className="summary_type">
                            <span className="summary_titie">
                                {/* <MdCalendarToday />  */}
                                Client
                            </span>

                            <div className="project_date">
                                <SKill>{company}</SKill>
                            </div>
                        </span>
                    </div>

                    <div className="date">
                        <span className="summary_type">
                            <span className="summary_titie">
                                {/* <MdCalendarToday />  */}
                                Project Duration
                            </span>

                            <div className="project_date">
                                <SKill>
                                    {startProject} ~ {endProject}
                                </SKill>
                            </div>
                        </span>
                    </div>
                    <div className="skill">
                        <span className="summary_type">
                            <span className="summary_titie">Use Skill</span>

                            {skill.map((e: string, idx: number) => {
                                return <SKill key={idx}>{e}</SKill>;
                            })}
                        </span>
                    </div>
                    <div className="date">
                        <span className="summary_type">
                            <span className="summary_titie">
                                {/* <MdCalendarToday />  */}
                                Site Url
                            </span>

                            <div
                                className="project_date"
                                onClick={() => projectView(project_url)}
                            >
                                <SKill $url={true}>
                                    <HiMiniLink />
                                    {project_url}
                                </SKill>
                            </div>
                        </span>
                    </div>
                </ProjectSummary>

                {/* quill-view */}
                <QuillView contents={project_description} />

                <Button.Type onClick={() => navigate('/project')}>
                    목록으로
                </Button.Type>
            </CustumStyle>
        </>
    );
};

export default ProjectDetail;
