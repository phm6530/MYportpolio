import { useSearchParams } from 'react-router-dom';
import { SpinnerLoading } from 'component/loading/SpinnerLoading';
import { SubTitle } from 'component/ui/Subtitle';

import useBlog from 'features/Blog/hooks/useBlog';
import BlogContents from '@features/Blog/BlogContents/BlogContents';
import SearchForm from 'component/ui/SearchForm';
import NonData from 'component/NonData';
import Paging from 'component/Paging';
import PostAddBtn from 'component/ui/PostAddBtn';
import useStore from 'store/zustandStore';
import { Tab } from 'features/Blog/BlogStyle';
import BlogTab from '@features/Blog/BlogTab.js/BlogTab';
import BlogNewPostList from 'features/Blog/BlogNewPostList/BlogNewPostList';
const BlogPage = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const { data, isLoading } = useBlog();

    const item: string = searchParams.get('item') || 'All';
    const search: string = searchParams.get('search') || 'all';

    const login = useStore(state => state.userAuth.login);

    return (
        <>
            <Tab>
                {/* 최신글 */}
                <BlogNewPostList />
                <BlogTab />
            </Tab>
            <SubTitle>
                <div className="subText">
                    <span className="point">{item}</span>
                    {login && <PostAddBtn />}
                </div>
            </SubTitle>

            {/* Search */}
            <SearchForm />

            {isLoading ? (
                <SpinnerLoading />
            ) : data && data?.resData.length > 0 ? (
                <>
                    <BlogContents data={data.resData} />
                    <Paging paging={data.paging} />
                </>
            ) : (
                <div>
                    {search === 'all' || search.trim() === '' ? (
                        <NonData message={'등록된 데이터가 없습니다.'} />
                    ) : (
                        <NonData
                            message={`"${search}" 검색 데이터가 없습니다.`}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default BlogPage;
