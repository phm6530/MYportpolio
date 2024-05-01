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
import NonData from 'component/NonData';

const MotionCustum = styled(Motion.FadeInOut)`
    width: 100%;
`;

const BlogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, setFilter } = useBlog();
    const [filteredData, setFilteredData] = useState([]);

    const item = searchParams.get('item') || 'All';
    const search = searchParams.get('search') || 'all';

    console.log('data:::', data);
    console.log('filteredData:::', filteredData);

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
            <Contents>
                <SubTitle>
                    <div className="subText">
                        <span className="point">{item}</span>
                    </div>
                </SubTitle>

                {/* Search */}
                <SearchForm setSearchParams={setSearchParams} />

                {isLoading ? (
                    <SpinnerLoading />
                ) : filteredData && filteredData.length > 0 ? (
                    <BlogContents data={filteredData} />
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
            </Contents>
        </>
    );
};

export default BlogPage;
