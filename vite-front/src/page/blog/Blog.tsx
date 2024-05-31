import { PageGrid } from '@layout/Grid';
import DashBoard from 'component/ui/DashBoard';

import { BoardWrapper } from '@features/Blog/BlogStyle';
import { Tab } from 'features/Blog/BlogStyle';

import BlogTab from '../../features/Blog/BlogTab.js/BlogTab';
import BlogRoutes from 'Route/BlogRoutes';

import BlogNewPostList from 'features/Blog/BlogNewPostList/BlogNewPostList';
import Motion from 'component/animations/Motion';
import { PageWrapper } from '@layout/Grid';

const Blog = (): JSX.Element => {
    return (
        <PageWrapper>
            <DashBoard
                pageTitle={'Blog'}
                subComment={'"퍼블리셔와 개발자 사이 그어딘가"'}
            />
            <Motion.FadeUp>
                <PageGrid>
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
                </PageGrid>
            </Motion.FadeUp>
        </PageWrapper>
    );
};

export default Blog;
