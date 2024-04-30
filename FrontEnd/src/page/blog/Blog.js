import UserProfile from 'component/profile/UserProfile';
import BannerCommon from 'component/ui/BannerCommon';
import DashBoard from 'component/ui/DashBoard';
import DashBoardTitle from 'component/ui/DashBoardTitle';
import { PageGrid } from 'component/ui/Grid';
import SubTitle from 'component/ui/Subtitle';
import BlogLayOut from 'features/Blog/BlogLayout';
import { RightWrap } from 'features/CommonStyles';

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
