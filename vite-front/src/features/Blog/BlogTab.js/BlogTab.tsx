import useBlogCategory from '../hooks/useBlogCategory';

import { useEffect, useState } from 'react';
import { type BlogCategorylist } from '@type/BlogTypes';
import AccodianTab from '@features/Blog/BlogTab.js/BlogTabAcodian';

const BlogTab = () => {
    const { data, isLoading } = useBlogCategory();
    const [categories, setCategories] = useState<BlogCategorylist | null>(null);

    useEffect(() => {
        if (!isLoading && data) {
            setCategories(data);
        }
    }, [data, isLoading]);

    return (
        <>
            {categories &&
                Object.keys(categories).map((category, idx) => (
                    <AccodianTab
                        list={categories[category]}
                        category={category}
                        idx={idx}
                        key={idx}
                    />
                ))}
        </>
    );
};

export default BlogTab;