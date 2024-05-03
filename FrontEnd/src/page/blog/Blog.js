import { PageGrid } from 'component/ui/Grid';
import BannerCommon from 'component/ui/BannerCommon';
import DashBoard from 'component/ui/DashBoard';
import DashBoardTitle from 'component/ui/DashBoardTitle';

import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading.js';
import { BoardWrapper } from 'features/Blog/BlogCommonStyle.js';
import { Tab } from 'features/Blog/BlogCommonStyle.js';

import BlogTab from 'features/Blog/BlogTab.js/index.js';
import useBlogCategory from 'features/Blog/hooks/useBlogCategory.js';
import BlogRoutes from 'Route/BlogRoutes';

const Blog = () => {
    const { data, isLoading } = useBlogCategory();

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
                {/* Blog LayOut */}
                <BoardWrapper>
                    {isLoading ? (
                        <SpinnerLoading />
                    ) : (
                        <>
                            {/* 탭 */}
                            <Tab>
                                <BlogTab categories={data.resData} />
                            </Tab>

                            {/* Route */}
                            <BlogRoutes data={data} />
                        </>
                    )}
                </BoardWrapper>
            </PageGrid>
        </>
    );
};

export default Blog;
