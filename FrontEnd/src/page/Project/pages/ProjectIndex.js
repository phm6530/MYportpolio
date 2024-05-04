import styled from 'styled-components';
import FadeinComponent from 'FadeinComponent';
import ProjectItem from 'features/project/ProjectItem';
import SubTitle from 'component/ui/Subtitle';

import { useEffect, useState } from 'react';
import { projectFetch } from 'services/projectService';
import AddPostBtn from 'features/common/Post/AddPostBtn';
import CateGoryButton from 'component/ui/CateGoryButton';
import { ReactQuery, ReactRouteDom } from 'lib/lib';
import SkeletonPost from 'component/ui/loading/Skeleton';
import SearchForm from 'component/ui/SearchForm';

const { useLocation, useSearchParams } = ReactRouteDom;
const { useQuery } = ReactQuery;

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
    background: var(--background-color-box);
    border: var(--border--btn-type-1);
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

export default function ProjectIndex() {
    const location = useLocation();
    const isProjectIndex =
        location.pathname === '/project' || location.pathname === '/project/';

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['project'],
        queryFn: projectFetch,
        refetchOnWindowFocus: false,
        enabled: isProjectIndex,
        keepPreviousData: true,
    });

    useEffect(() => {
        if (isSuccess) {
            const responseData = data?.resData || [];
            setProject(responseData);
        }
    }, [isSuccess, data]);

    const [param] = useSearchParams();
    const [project, setProject] = useState([]);
    const [activeIdx, setActiveIdx] = useState(null);
    const SeachValue = param.get('search');

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
                    <div className="subText">
                        <span className="point">MY PORTPOLIO</span> LIST
                    </div>

                    {/* add Project */}
                    <AddPostBtn />
                </SubTitle>

                {/* List */}
                <FlexRow>
                    <CateGoryButton CateGory={CateGory} type={'queryString'} />

                    {/* 검색창 */}
                    <SearchForm />
                </FlexRow>

                {!isLoading && SeachValue && SeachArr.length === 0 && (
                    <NoSeachingData>
                        &quot;{SeachValue}&quot; 키워드와 일치하는 항목이 없음
                    </NoSeachingData>
                )}
                {!isLoading && isError && 'error'}
                {!isLoading ? (
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
                ) : (
                    <>
                        {/* 스켈레톤 */}
                        <SkeletonPost listCnt={6} />
                    </>
                )}
            </ProjectListStyle>
        </>
    );
}
