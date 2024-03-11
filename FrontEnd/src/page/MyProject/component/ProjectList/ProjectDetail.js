import { useEffect, useRef } from 'react';
import { ProjectWrapStyle } from './Styled/ProjectListStyled';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import useProjectActions from 'hooks/useProjectActions';
import Popup from 'component/popup/Popup';
import Confirm from 'component/ui/Confirm';
import { MdCalendarToday } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaListUl } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { HiMiniLink } from 'react-icons/hi2';
import { Button } from 'component/ui/Button';

const SKill = styled.span`
    display: inline-block;
    color: #555969;
    border-radius: 18px;
    padding: 0.3rem 0.9rem;
    font-size: 0.7rem;
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
    .title {
        font-size: 1.5rem;
        color: #222;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .company {
        font-size: 0.8rem;
        opacity: 0.6;
        color: rgba(107 114 128);
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
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

const Linkarea = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    button {
        border: 1px solid;
        padding: 0.3rem 1.4rem;
    }
`;

const SummaryTitle = styled.div`
    background: linear-gradient(to top, #000000, #4b5787, #000000);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    font-weight: bold;
    font-size: 1.5rem !important;
    margin-bottom: 1rem;
    display: inline-block;
`;

const HashtagArea = styled.div`
    margin-bottom: 2rem;
`;

const HashTag = styled.span`
    align-items: center;
    display: inline-flex;
    font-weight: 500;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 11px;
    color: rgb(75, 148, 250);
    background-color: rgb(235, 244, 255);
    margin-right: 0.4rem;
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

const Hashtage = styled.div`
    color: rgb(75, 148, 250);
    background-color: rgb(235, 244, 255);
    font-size: 12px;
`;

function ProjectDetail({ result }) {
    const ref = useRef();
    const {
        mutateAsync,
        updateHandler,
        deleteHandler, // 삭제
        setModal, //
        modal,
    } = useProjectActions();
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
    // console.log(skillArr);

    useEffect(() => {
        ref.current.setAttribute('id', 'quill_Editor');
        ref.current.classList = 'ql-editor';
    }, []);

    const renderHTML = quillHTML => {
        return { __html: quillHTML };
    };
    const projectView = url => {
        window.open(url, '_blank');
    };

    return (
        <>
            {modal && (
                <Popup closePopup={() => setModal(false)}>
                    <Confirm message={title} confirm={() => mutateAsync(project_key)} />
                </Popup>
            )}
            <CustumStyle>
                {/* <EditArea param={param.key} /> */}
                {/* project 정보 */}
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
                            <button onClick={() => deleteHandler(project_key)}>
                                <FaTrashAlt />
                            </button>
                        </ButtonArea>
                    </div>
                    <HashtagArea>
                        {HashTagArr.map(e => {
                            return <HashTag>{`# ${e}`}</HashTag>;
                        })}
                    </HashtagArea>

                    {/* <div className="company">{company}</div> */}
                    {/* <Linkarea>
                        <button>자세히 보기</button>
                    </Linkarea> */}
                </ProjectSummary>
                <ProjectThumbNail>
                    <img src={`http://localhost:8080/${thumbnail}`} alt={title} />
                </ProjectThumbNail>
                <ProjectViewFooter>
                    ※ 본 게시물은 상업적 목적이 아닌 포트폴리오 목적으로만 사용됩니다. <br></br>아직 공개되지 않은
                    작업물은 포함하지 않으며, 오직 공개된 작업물만을 게시합니다.
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
                                // const SKillComponent = SKILL_ICON[e];
                                // return (
                                //     <SkillIconStyle>
                                //         <SKillComponent label={e} />
                                //     </SkillIconStyle>
                                // );
                            })}
                        </span>
                    </div>
                    <div className="date">
                        <span className="summary_type">
                            <span className="summary_titie">
                                {/* <MdCalendarToday />  */}
                                Site Url
                            </span>

                            <div className="project_date" onClick={() => projectView(project_url)}>
                                <SKill $url={true}>
                                    <HiMiniLink />
                                    {project_url}
                                </SKill>
                            </div>
                        </span>
                    </div>
                </ProjectSummary>
                {/* quill-editor */}
                <div ref={ref} dangerouslySetInnerHTML={renderHTML(project_description)}></div>
                <Button.Type onClick={() => navigate('/project')}>목록으로</Button.Type>
            </CustumStyle>
        </>
    );
}

export default ProjectDetail;
