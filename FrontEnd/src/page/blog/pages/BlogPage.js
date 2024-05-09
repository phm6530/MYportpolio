import { useSearchParams } from 'react-router-dom';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';

import SubTitle from 'component/ui/Subtitle';
import useBlog from 'features/Blog/hooks/useBlog';
import BlogContents from 'features/Blog/BlogContents';
import SearchForm from 'component/ui/SearchForm';
import NonData from 'component/NonData';
import Paging from 'component/Paging';
import AddPostBtn from 'features/common/Post/AddPostBtn';

const BlogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading } = useBlog();

    const item = searchParams.get('item') || 'All';
    const search = searchParams.get('search') || 'all';

    return (
        <>
            <SubTitle>
                <div className="subText">
                    <span className="point">{item}</span>
                    <AddPostBtn />
                </div>
            </SubTitle>

            {/* Search */}
            <SearchForm setSearchParams={setSearchParams} />

            {isLoading ? (
                <SpinnerLoading />
            ) : data && data.resData.length > 0 ? (
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
