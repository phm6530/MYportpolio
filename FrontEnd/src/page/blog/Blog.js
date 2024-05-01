import BannerCommon from 'component/ui/BannerCommon';
import DashBoard from 'component/ui/DashBoard';
import DashBoardTitle from 'component/ui/DashBoardTitle';
import { PageGrid } from 'component/ui/Grid';
import BlogLayOut from 'features/Blog/BlogLayout';

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
                {/* Blog LayOut */}
                <BlogLayOut />
            </PageGrid>
        </>
    );
};

export default Blog;
