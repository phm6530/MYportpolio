import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { queryKey } from 'services/queryKey';
import { ENDPOINT_URL } from 'constants/apiUrl';
import QuillView from 'component/editor/QuillView';

const blogPostDetail = async key => {
    try {
        console.log(`${ENDPOINT_URL}/blog/postdetail/${key}`);
        const response = await fetch(`${ENDPOINT_URL}/blog/postdetail/${key}`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const BlogDetail = () => {
    const { key } = useParams();
    const { data } = useQuery({
        queryKey: [queryKey.blogDetail],
        queryFn: () => blogPostDetail(key),
    });

    return (
        <>
            {data && JSON.stringify(data.resData)}
            <QuillView contents={data?.resData.contents} />
        </>
    );
};

export default BlogDetail;
