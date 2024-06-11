import SearchForm from 'component/ui/SearchForm';
import { Tab } from 'features/Blog/BlogStyle';
import BlogTab from '@features/Blog/BlogTab.js/BlogTab';
import BlogNewPostList from 'features/Blog/BlogNewPostList/BlogNewPostList';
import BlogList from '@features/Blog/BlogList/BlogList';
import BlogSUbCategoryTitle from '@features/Blog/BlogSubCategoryTitle';
import HelmetComponent from '@features/seo/HelmetComponent';

const BlogPage = (): JSX.Element => {
    return (
        <>
            <HelmetComponent description="저의 포트폴리오에 방문해 주셔서 감사합니다." />

            <Tab>
                {/* 최신글 */}
                <BlogNewPostList />
                <BlogTab />
            </Tab>
            <BlogSUbCategoryTitle />
            {/* Search */}
            <SearchForm />
            {/* Board List */}
            <BlogList />
        </>
    );
};

export default BlogPage;
