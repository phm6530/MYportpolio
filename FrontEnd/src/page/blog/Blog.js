import { PageGrid } from 'component/ui/Grid';
import BannerCommon from 'component/ui/BannerCommon';
import DashBoard from 'component/ui/DashBoard';
import DashBoardTitle from 'component/ui/DashBoardTitle';

import { BoardWrapper } from 'features/Blog/BlogCommonStyle.js';
import { Tab } from 'features/Blog/BlogCommonStyle.js';

import BlogTab from 'features/Blog/BlogTab.js/index.js';
import BlogRoutes from 'Route/BlogRoutes';

import BlogNewPostList from 'features/Blog/BlogNewPostList';
import Motion from 'component/animations/Motion';

const Blog = () => {
    return (
        <>
            <DashBoard
                pageTitle={'Blog'}
                subComment={'"퍼블리셔와 개발자 사이 그어딘가"'}
            />
            <Motion.FadeUp>
                <PageGrid>
                    <BoardWrapper>
                        {/* Blog LayOut */}
                        <Tab>
                            <BlogTab />

                            {/* 최신글 */}
                            <BlogNewPostList />
                        </Tab>
                        <BlogRoutes />
                    </BoardWrapper>
                </PageGrid>
            </Motion.FadeUp>
        </>
    );
};

export default Blog;
