import styled from 'styled-components';
import BlogItem from './BlogItem';
import { AnimatePresence } from 'framer-motion';
import Motion from 'component/animations/Motion';
import { useLocation } from 'react-router-dom';

const Contents = styled.div`
    flex-direction: column;
    border-radius: 1em;
    flex-grow: 1;
    width: 100%;
    padding-top: 2rem;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const BlogContents = ({ data = [] }) => {
    const location = useLocation();
    console.log(location.search);

    return (
        <AnimatePresence mode="wait">
            <Motion.FadeInOut key={location.search}>
                <Contents>
                    {data.map((item, idx) => {
                        return <BlogItem item={item} key={'test' + idx} />;
                    })}
                </Contents>
            </Motion.FadeInOut>
        </AnimatePresence>
    );
};

export default BlogContents;
