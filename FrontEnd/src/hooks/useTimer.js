import { ReactQuery } from 'lib/lib';
import { fetchTimerSetting } from 'services/tastTimerService';
import { queryKey } from 'services/queryKey';

const { useQuery } = ReactQuery;

const useTimer = () => {
    const { data, isLoading } = useQuery({
        queryKey: [queryKey.timer],
        queryFn: fetchTimerSetting,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
    };
};

export default useTimer;
