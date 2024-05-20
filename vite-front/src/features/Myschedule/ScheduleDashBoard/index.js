import styled from 'styled-components';
import ScheduleMainFoucs from './ScheduleMainFoucs';
import { BoxStyle } from 'features/CommonStyles';
import { useQuery } from '@tanstack/react-query';
import { fetchTimerSetting } from 'services/tastTimerService';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';
import CardSubtitle from '../component/CardSubtitle';
import useTimer from 'hooks/useTimer';

const ScheduleDashBoard = () => {
    // utc 정시구하기
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const { timerData } = useTimer();
    // console.log('timerData :::: ', timerData);

    // const test = data => {
    //     if (!filter) return data;
    //     console.log(data.categoryDailyTotals);
    // };

    // const krDate = new Date(`${year}-${month}-${day}T00:00:00+09:00`);
    // const utcDate = krDate.toISOString();

    const { data, isLoading } = useQuery({
        queryKey: ['ScheduleTimer'],
        queryFn: fetchTimerSetting,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <SpinnerLoading />;
    }

    return (
        <>
            {/* myStatus */}
            <BoxStyle>
                <CardSubtitle
                    title={'활동 기록'}
                    isRedirect={true}
                    redirectTo={'/myschedule/report'}
                    buttonText={'Report'}
                />
                <ScheduleMainFoucs
                    timerData={data?.timerData}
                    categoryDailyTotals={data?.categoryDailyTotals}
                />
            </BoxStyle>
        </>
    );
};

export default ScheduleDashBoard;
