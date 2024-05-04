import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import useProjectActions from 'hooks/useProjectActions';

import { ProjectWrapStyle } from 'features/project/ProjectListStyled';
import { useNavigate } from 'react-router-dom';
import { FaListUl } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { HiMiniLink } from 'react-icons/hi2';
import { Button } from 'component/ui/Button';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { HashTag } from 'component/CommonStyle';
import QuillView from 'component/editor/QuillView';
import usePopup from 'hooks/usePopup';

const SKill = styled.span`
    display: inline-block;
    color: #555969;
    border-radius: 18px;
    padding: 0.3rem 0.9rem;
    font-size: 14px;
    font-weight: bold;
    margin-right: 0.6rem;
    color: rgb(120 141 170);
    background-color: rgb(235, 244, 255);

    ${props =>
        props.$url &&
        `
            color: #3963a7;
            text-decoration: underline;
            cursor: pointer;        
            display: inline-flex;
            &:hover{
                    color: #0d68fb;
            }
        `}
`;

const CustumStyle = styled(ProjectWrapStyle)`
    padding: 4rem;
`;

const ButtonArea = styled.div`
    button {
        font-size: 14px;
        font-weight: normal;
        padding: 0.2rem;
        border-radius: 4px;
        margin-left: 5px;
    }
`;

const ProjectSummary = styled.div`
    margin: 0 1rem;
    margin-bottom: 1rem;
    width: 100%;
    .title {
        font-size: 1.5rem;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .company {
        font-size: 0.8rem;
        opacity: 0.6;
        color: rgba(107 114 128);
        padding-bottom: 2rem;
        margin-bottom: 2rem;
    }
    .date,
    .skill {
        margin-bottom: 2rem;
    }
    .summary_type {
        font-size: 0.9rem;
        font-weight: bold;
        .project_date {
            font-weight: normal;
        }
        .summary_titie {
            display: flex;
            margin-bottom: 0.5rem;
            font-size: 16px;
        }
        span {
            align-items: center;

            svg {
                margin-right: 10px;
                position: relative;
            }
        }

        flex-direction: column;
    }
`;

const HashtagArea = styled.div`
    margin-bottom: 2rem;
`;

const ProjectThumbNail = styled.div`
    overflow: hidden;
    border-radius: 2rem;
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
`;

const ProjectViewFooter = styled.div`
    font-size: 0.8rem;
    margin-bottom: 2rem;
`;

function ProjectDetail({ result }) {
    const { checkHandler } = useAuthCheck();
    const { mutateAsync } = useProjectActions('project');
    const { showPopup, PopupComponent } = usePopup();
    const navigate = useNavigate();
    const {
        project_key,
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

    const skillArr = skill.split(',');
    const HashTagArr = hashtag.split(',');

    console.log('랜더');
    const projectView = url => {
        window.open(url, '_blank');
    };

    const updateHandler = key => {
        if (!checkHandler()) {
            return;
        }
        navigate(`/project/add?type=edit&key=${key}`);
    };

    const deleteHandler = () => {
        if (!checkHandler()) return;
        showPopup('ㄹㄹ');
    };

    return (
        <>
            <PopupComponent
                message={title}
                event={() => mutateAsync(project_key)}
            />

            <CustumStyle>
                <ProjectSummary>
                    <div className="title">
                        {title}

                        <ButtonArea>
                            <button onClick={() => navigate('/project')}>
                                <FaListUl />
                            </button>
                            <button onClick={() => updateHandler(project_key)}>
                                <MdModeEdit />
                            </button>
                            <button onClick={deleteHandler}>
                                <FaTrashAlt />
                            </button>
                        </ButtonArea>
                    </div>
                    <HashtagArea>
                        {HashTagArr.map((e, idx) => {
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
                    {/* <SummaryTitle>WORK SUMMARY</SummaryTitle> */}
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

                            {skillArr.map((e, idx) => {
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
}

export default ProjectDetail;
