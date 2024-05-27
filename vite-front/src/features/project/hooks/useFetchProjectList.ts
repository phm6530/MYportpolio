import { useQuery } from '@tanstack/react-query';
import { ProjectDetailProps } from '@type/ProjectTypes';
import { useLocation } from 'react-router-dom';
import { projectFetch } from 'services/projectService';

const useFetchProjectList = () => {
    const location = useLocation();
    const isProjectIndex =
        location.pathname === '/project' || location.pathname === '/project/';

    return useQuery<ProjectDetailProps[], Error>({
        queryKey: ['project'],
        queryFn: projectFetch,
        refetchOnWindowFocus: false,
        enabled: isProjectIndex,
    });
};

export default useFetchProjectList;
