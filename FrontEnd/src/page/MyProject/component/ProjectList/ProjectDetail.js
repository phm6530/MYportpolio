import { useEffect, useRef } from 'react';
import { ProjectWrapStyle } from './Styled/ProjectListStyled';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
const ProjectSummary = styled.div``;

function ProjectDetail({ result }) {
    const ref = useRef();

    const { title, company, skill, startProject, endProject, project_description } = result;

    useEffect(() => {
        ref.current.setAttribute('id', 'quill_Editor');
        ref.current.classList = 'ql-editor';
    }, []);

    const renderHTML = quillHTML => {
        return { __html: quillHTML };
    };

    return (
        <>
            <ProjectWrapStyle>
                {/* <EditArea param={param.key} /> */}
                {/* project 정보 */}
                <ProjectSummary>
                    제목 : {title}
                    고객사 : {company}
                    시작일 : {startProject}
                    마감일 : {endProject}
                    마감일 : {skill}
                </ProjectSummary>

                {/* quill-editor */}
                <div ref={ref} dangerouslySetInnerHTML={renderHTML(project_description)}></div>
            </ProjectWrapStyle>
        </>
    );
}

export default ProjectDetail;
