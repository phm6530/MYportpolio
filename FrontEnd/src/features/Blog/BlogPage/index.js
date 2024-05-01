import { useSearchParams } from 'react-router-dom';
import { Contents } from '../BlogCommonStyle';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import SubTitle from 'component/ui/Subtitle';
import useBlog from '../hooks/useBlog';
import Motion from 'component/animations/Motion.js';
import BlogContents from '../BlogContents';
import styled from 'styled-components';
import SearchForm from 'component/ui/SearchForm';

const MotionCustum = styled(Motion.FadeInOut)`
    width: 100%;
`;

const BlogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, setFilter } = useBlog();
    const [filteredData, setFilteredData] = useState([]);

    const item = searchParams.get('item') || 'All';
    const search = searchParams.get('search') || 'all';

    useEffect(() => {
        setFilter(item);
    }, [item, data, setFilter]);

    useEffect(() => {
        if (search === 'all' || search.trim() === '') {
            setFilteredData(data);
        } else {
            const lowerCaseSearch = search.toLocaleLowerCase();
            const result = data?.filter(e =>
                e.title.toLocaleLowerCase().includes(lowerCaseSearch),
            );
            setFilteredData(result);
        }
    }, [data, search]);

    return (
        <>
            <AnimatePresence mode="wait">
                <MotionCustum key={`key-${item}`}>
                    <Contents>
                        <SubTitle>
                            <div className="subText">
                                <span className="point">{item}</span>
                            </div>
                        </SubTitle>

                        {/* Search */}
                        <SearchForm setSearchParams={setSearchParams} />

                        {!isLoading ? (
                            data.length === 0 ? (
                                '데이터가 없습니다'
                            ) : (
                                <BlogContents data={filteredData} />
                            )
                        ) : (
                            <SpinnerLoading />
                        )}
                    </Contents>
                </MotionCustum>
            </AnimatePresence>
        </>
    );
};

export default BlogPage;
