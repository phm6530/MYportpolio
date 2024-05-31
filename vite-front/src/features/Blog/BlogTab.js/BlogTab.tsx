import useBlogCategory from '../hooks/useBlogCategory';

import { useEffect, useState } from 'react';
import { type BlogCategorylist } from '@type/BlogTypes';
import AccodianTab from '@features/Blog/BlogTab.js/BlogTabAcodian';
import styled from 'styled-components';

const TabWrapper = styled.div`
    margin-left: 4rem;
`;

const BlogTab = () => {
    const { data, isLoading } = useBlogCategory();
    const [categories, setCategories] = useState<BlogCategorylist | null>(null);

    useEffect(() => {
        if (!isLoading && data) {
            setCategories(data);
        }
    }, [data, isLoading]);

    return (
        <TabWrapper>
            {categories &&
                Object.keys(categories).map((category, idx) => (
                    <AccodianTab
                        list={categories[category]}
                        category={category}
                        idx={idx}
                        key={idx}
                    />
                ))}
        </TabWrapper>
    );
};

export default BlogTab;
