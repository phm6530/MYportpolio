import styled from 'styled-components';
import BlogItem from './BlogItem';

const Contents = styled.div`
    flex-direction: row;
    border-radius: 1em;
    background: #fff;
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    padding: 2rem 2rem;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const BlogContents = ({ data = [] }) => {
    console.log(data);

    return (
        <Contents>
            {data.map((item, idx) => (
                <BlogItem item={item} key={'test' + idx} />
            ))}
        </Contents>
    );
};

export default BlogContents;
