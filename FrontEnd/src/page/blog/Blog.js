import { PageGrid } from 'component/ui/Grid';
import BannerCommon from 'component/ui/BannerCommon';
import DashBoard from 'component/ui/DashBoard';
import DashBoardTitle from 'component/ui/DashBoardTitle';

import { BoardWrapper } from 'features/Blog/BlogCommonStyle.js';
import { Tab } from 'features/Blog/BlogCommonStyle.js';

import BlogTab from 'features/Blog/BlogTab.js/index.js';
import BlogRoutes from 'Route/BlogRoutes';

import BlogNewPostList from 'features/Blog/BlogNewPostList';

const Blog = () => {
    return (
        <>
            <DashBoard page={'Contact'}>
                <BannerCommon.BannerPoint>
                    <img src="/img/developer.png" alt="developer" />
                    my Blog
                </BannerCommon.BannerPoint>

                <DashBoardTitle>
                    <b>Blog</b>
                </DashBoardTitle>
            </DashBoard>

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
        </>
    );
};

export default Blog;
