import { useSearchParams } from 'react-router-dom';
import SubTitle from 'component/ui/Subtitle';
import { Contents } from '../BlogCommonStyle';
import useBlog from '../hooks/useBlog';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';

const BlogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');
    const item = searchParams.get('item') || 'All';

    const { data, isLoading } = useBlog();

    // console.log(category);
    // console.log(item);

    console.log(data);
    return (
        <>
            <Contents>
                <SubTitle>
                    <div className="subText">
                        <span className="point">{item}</span>
                    </div>
                </SubTitle>
                {isLoading && <SpinnerLoading />}
                {/* {!isLoading && data} */}
            </Contents>
        </>
    );
};

export default BlogPage;
