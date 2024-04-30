import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading.js';

import Motion from 'component/animations/Motion.js';
import BlogTab from './BlogTab.js';
import { Tab } from './BlogCommonStyle.js';
import BlogPage from './BlogPage/index.js';
import { BoardWrapper } from './BlogCommonStyle.js';
import useBlogCategory from './hooks/useBlogCategory.js';

const BlogLayOut = () => {
    const [param] = useSearchParams();
    const { data, isLoading } = useBlogCategory();

    console.log(data);
    const parameter = param.get('item') || 'All';

    return (
        <>
            <AnimatePresence mode="wait">
                <BoardWrapper>
                    {isLoading ? (
                        <SpinnerLoading />
                    ) : (
                        <>
                            <Tab>
                                <BlogTab cateGory={data.category} />
                            </Tab>

                            {/* ContentsArea */}
                            <Motion.FadeInOut key={parameter}>
                                <BlogPage data={data} />
                            </Motion.FadeInOut>
                        </>
                    )}
                </BoardWrapper>
            </AnimatePresence>
        </>
    );
};

export default BlogLayOut;
