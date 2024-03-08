import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import UserProfile from 'component/profile/UserProfile';

const ProjectWrap = styled.div`
    display: flex;
`;
export default function Project() {
    return (
        <>
            {/* Wrap */}
            <ProjectWrap>
                <UserProfile />
                <Outlet />
            </ProjectWrap>
        </>
    );
}
