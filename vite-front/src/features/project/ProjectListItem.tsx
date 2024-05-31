// icon
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { HashTag } from '@style/commonStyle';
import {
    ProjectFadeinStyle,
    ProjectImgArea,
    ProjectCompany,
    ProjectDescription,
    ProjectItemHeaderStyle,
    ViewIconAnimation,
    ProjectItemWrap,
} from '@features/project/ProjectListItemStyle';

import { ProjectPostProps } from '@type/ProjectTypes';

const ProjectListItem: React.FC<{ project: ProjectPostProps }> = ({
    project,
}) => {
    const { thumbnail, company, hashtag, description, projectKey } = project;
    const navigate = useNavigate();

    return (
        <>
            <ProjectFadeinStyle onClick={() => navigate(`${projectKey}`)}>
                <ProjectImgArea
                    $backImg={`http://localhost:8080/${thumbnail}`}
                    className="projectItemImg"
                >
                    <ViewIconAnimation className="aniTarget">
                        <FaMagnifyingGlass />
                    </ViewIconAnimation>
                </ProjectImgArea>

                <ProjectItemWrap>
                    {/* Header */}
                    <ProjectCompany>{company}</ProjectCompany>

                    <ProjectItemHeaderStyle>
                        {project.title}
                    </ProjectItemHeaderStyle>

                    {/* Company */}
                    <ProjectDescription>{description}</ProjectDescription>
                    <div>
                        {hashtag &&
                            hashtag.map((e: string, idx: number) => (
                                <HashTag
                                    className="hashTag"
                                    key={`hash-${idx}`}
                                >
                                    # {e}
                                </HashTag>
                            ))}
                    </div>
                </ProjectItemWrap>
            </ProjectFadeinStyle>
        </>
    );
};

export default ProjectListItem;
