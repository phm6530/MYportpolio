import { useEffect, useRef } from 'react';
import { ProjectWrapStyle } from './Styled/ProjectListStyled';

function ProjectDetail({ result }) {
    const ref = useRef();

    const { title, company, skill, startProject, endProject, project_description } = result;
    useEffect(() => {
        console.log(ref.current);
    }, []);

    const renderHTML = quillHTML => {
        return { __html: quillHTML };
    };

    return (
        <>
            <ProjectWrapStyle>
                {/* <EditArea param={param.key} /> */}
                제목 : {title}
                고객사 : {company}
                시작일 : {startProject}
                마감일 : {endProject}
                마감일 : {skill}
                <div ref={ref}>
                    <div dangerouslySetInnerHTML={renderHTML(project_description)}></div>
                </div>
            </ProjectWrapStyle>
        </>
    );
}

export default ProjectDetail;
