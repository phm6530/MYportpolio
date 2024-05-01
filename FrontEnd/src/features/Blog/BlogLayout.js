import { Route, Routes, useSearchParams } from 'react-router-dom';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading.js';

import BlogTab from './BlogTab.js';
import { Tab } from './BlogCommonStyle.js';
import BlogPage from './BlogPage/index.js';
import { BoardWrapper } from './BlogCommonStyle.js';
import useBlogCategory from './hooks/useBlogCategory.js';
import BlogDetail from './BlogDetail/index.js';

const BlogLayOut = () => {
    const [param] = useSearchParams();
    const { data, isLoading } = useBlogCategory();
    const parameter = param.get('item') || 'All';

    console.log(data);
    console.log(parameter);

    return (
        <>
            <BoardWrapper>
                {isLoading ? (
                    <SpinnerLoading />
                ) : (
                    <>
                        <Tab>
                            <BlogTab cateGory={data.category} />
                        </Tab>

                        {/* ContentsArea */}
                        <Routes>
                            <Route index element={<BlogPage data={data} />} />
                            <Route path=":key" element={<BlogDetail />} />
                        </Routes>
                    </>
                )}
            </BoardWrapper>
        </>
    );
};

export default BlogLayOut;
