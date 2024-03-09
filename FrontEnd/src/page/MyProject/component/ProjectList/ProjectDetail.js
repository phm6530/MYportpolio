import { useEffect, useRef } from 'react';
import { ProjectWrapStyle } from './Styled/ProjectListStyled';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import useProjectActions from 'hooks/useProjectActions';
import Popup from 'component/popup/Popup';
import Confirm from 'component/ui/Confirm';
import { MdCalendarToday } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SKill = styled.span`
    font-weight: bold;
    font-size: 0.78rem;
    color: #555969;
    border-radius: 18px;
    padding: 0.5rem;
    margin-right: 0.6rem;
    background-color: #f2f3f7c7;
`;

const CustumStyle = styled(ProjectWrapStyle)`
    padding: 3rem 2rem;
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

    .title {
        font-size: 1.7rem;
        color: #222;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
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
            margin-bottom: 1rem;
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
    const { project_key, title, company, skill, startProject, endProject, project_description } = result;

    const skillArr = skill.split(',');
    console.log(skillArr);

    useEffect(() => {
        ref.current.setAttribute('id', 'quill_Editor');
        ref.current.classList = 'ql-editor';
    }, []);

    const renderHTML = quillHTML => {
        return { __html: quillHTML };
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
                            <button onClick={() => navigate('/project')}>목록</button>
                            <button onClick={() => updateHandler(project_key)}>수정</button>
                            <button onClick={() => deleteHandler(project_key)}>삭제</button>
                        </ButtonArea>
                    </div>
                    <div className="company">{company}</div>
                    {/* <Linkarea>
                        <button>자세히 보기</button>
                    </Linkarea> */}
                </ProjectSummary>
                <ProjectSummary>
                    <div className="date">
                        <span className="summary_type">
                            <span className="summary_titie">
                                <MdCalendarToday /> Project 기간
                            </span>
                            <div className="project_date">
                                <SKill>
                                    {startProject} - {endProject}
                                </SKill>
                            </div>
                        </span>
                    </div>
                    <div className="skill">
                        <span className="summary_type">
                            <span className="summary_titie">Project SKILL</span>

                            {skillArr.map(e => {
                                return <SKill>{e}</SKill>;
                                // const SKillComponent = SKILL_ICON[e];
                                // return (
                                //     <SkillIconStyle>
                                //         <SKillComponent label={e} />
                                //     </SkillIconStyle>
                                // );
                            })}
                        </span>
                    </div>
                </ProjectSummary>

                {/* quill-editor */}
                <div ref={ref} dangerouslySetInnerHTML={renderHTML(project_description)}></div>
            </CustumStyle>
        </>
    );
}

export default ProjectDetail;
