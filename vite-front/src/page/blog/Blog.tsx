import { Grid } from '@layout/Grid';
import DashBoard from 'component/ui/DashBoard';

import { BoardWrapper } from '@features/Blog/BlogStyle';
import { Tab } from 'features/Blog/BlogStyle';

import BlogTab from '../../features/Blog/BlogTab.js/BlogTab';
import BlogRoutes from 'Route/BlogRoutes';

import BlogNewPostList from 'features/Blog/BlogNewPostList/BlogNewPostList';
import { PageWrapper } from '@layout/Grid';
import styled from 'styled-components';
import { device } from 'config/DeviceConfig';

const CustomGrid = styled(Grid)`
    width: 100%;

    @media ${device.laptopL} {
        width: auto;
    }
`;

const Blog = (): JSX.Element => {
    return (
        <PageWrapper>
            <DashBoard
                pageTitle={'Blog'}
                subComment={'"퍼블리셔와 개발자 사이 그어딘가"'}
            />
            <CustomGrid>
                <BoardWrapper>
                    {/* Blog LayOut */}
                    <Tab>
                        {' '}
                        {/* 최신글 */}
                        <BlogNewPostList />
                        <BlogTab />
                    </Tab>
                    <BlogRoutes />
                </BoardWrapper>
            </CustomGrid>
        </PageWrapper>
    );
};

export default Blog;
