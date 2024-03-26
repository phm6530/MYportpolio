import { ReactQuery } from 'lib/lib';
import { fetchData } from './page/Board/BoardFetch';
import Fadeup from './FadeinComponent';

const { useQuery } = ReactQuery;
// React 는 JSX를 랜더링하며 훅들은 호출함 이후 마운트 되고 useEffect를 실행하여 요소설정

const Animation = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['test'],
        queryFn: () => fetchData(1),
    });

    //threshold - 교차
    return (
        <>
            {!isLoading &&
                data.pageData &&
                data.pageData.map((e, idx) => {
                    return (
                        <Fadeup position={'right'} key={`key-${idx}`}>
                            {JSON.stringify(e)}{' '}
                        </Fadeup>
                    );
                })}
        </>
    );
};

export default Animation;
