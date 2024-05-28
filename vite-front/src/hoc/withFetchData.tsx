import { ReactQuery, ReactRouteDom } from 'lib/lib';
import { ComponentType } from 'react';
import NotfoundPage from 'component/error/NotfoundPage';

const { useParams } = ReactRouteDom;
const { useQuery } = ReactQuery;

interface WithFetchDataReturnProps {
    redirectPath: string;
    queryKeyPrefix: string;
}
const withFetchData = <P extends object, R extends P>(
    Component: ComponentType<P>,
    fetchFunction: (key: string) => Promise<R>,
) => {
    return ({
        redirectPath,
        queryKeyPrefix,
        ...props //뿌리기
    }: WithFetchDataReturnProps & Partial<P>) => {
        const { key } = useParams<{ key: string }>();

        const { data } = useQuery<R>({
            queryKey: [queryKeyPrefix, key],
            queryFn: () => fetchFunction(key!),
            enabled: !!key,
        });

        return data ? (
            <Component {...(data as R)} {...(props as P)} />
        ) : (
            <NotfoundPage redirectPath={redirectPath} />
        );
    };
};

export default withFetchData;
