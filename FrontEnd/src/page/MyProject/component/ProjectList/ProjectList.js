import styled from 'styled-components';
import FadeinComponent from '../../../../FadeinComponent';
import ProjectItem from './Detail/ProjectItem';
import SubTitle from 'component/ui/Subtitle';

import { useQuery } from 'react-query';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { projectFetch } from 'services/projectService';
import { ProjectWrapStyle } from './Styled/ProjectListStyled';
import ProjectAddBtn from 'features/project/component/Detail/ProjectAddBtn';
import CateGoryButton from 'component/ui/CateGoryButton';
import ProjectSeach from 'features/project/component/Detail/ProjectSeach';

const NoSeachingData = styled(FadeinComponent)`
    text-align: center;
    height: 300px;
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1em;
`;

const ProjectListStyle = styled.div`
    flex-direction: row;
    border-radius: 1em;
    background: #fff;
    flex-grow: 1;
    overflow: hidden;
    padding: 2rem 2rem;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const FlexRow = styled.div`
    display: flex;
    width: 100%;

    align-items: center;
`;

export default function ProjectList() {
    const location = useLocation();
    const isProjectIndex =
        location.pathname === '/project' || location.pathname === '/project/';
    const { isLoading, isError } = useQuery('project', projectFetch, {
        enabled: isProjectIndex,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        onSuccess: data => {
            const responseData = data?.resData || [];
            setProject(responseData);
        },
    });

    const [param] = useSearchParams();
    const [project, setProject] = useState([]);
    const [activeIdx, setActiveIdx] = useState(null);
    const SeachValue = param.get('seach');

    const SeachArr = project.filter(e => {
        if (SeachValue === 'All') {
            return true;
        }
        return e.hashtag.includes(SeachValue);
    });
    const ProjectArr = SeachValue ? SeachArr : project;
    const CateGory = ['All', '반응형', 'React', '참여율 100%'];
    return (
        <>
            <ProjectListStyle>
                <SubTitle>
                    {/* <img src="/img/board/talk.png" alt="" /> */}
                    <div className="subText">
                        <span className="point">MY PORTPOLIO</span> LIST
                    </div>
                    <ProjectAddBtn />
                </SubTitle>

                {/* List */}
                <FlexRow>
                    <CateGoryButton CateGory={CateGory} type={'queryString'} />
                    <ProjectSeach />
                </FlexRow>
                {isLoading && <NoSeachingData>Loading...</NoSeachingData>}
                {SeachValue && SeachArr.length === 0 && (
                    <NoSeachingData>
                        "{SeachValue}" 키워드와 일치하는 항목이 없음
                    </NoSeachingData>
                )}
                {!isLoading && isError && 'error'}
                {!isLoading && !isError && (
                    <>
                        {project.length === 0 && '등록된 프로젝트가 없습니다..'}
                        {ProjectArr.map(project => (
                            <ProjectItem
                                activeIdx={activeIdx}
                                setActiveIdx={setActiveIdx}
                                project={project}
                                key={project.project_key + SeachValue}
                            />
                        ))}
                    </>
                )}
            </ProjectListStyle>
        </>
    );
}
