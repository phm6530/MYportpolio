import DashBoard from '../../component/ui/DashBoard';

import BannerCommon from 'component/ui/BannerCommon';
import DashBoardTitle from 'component/ui/DashBoardTitle';

import alertThunk from 'store/alertTrunk';

import { ReactQuery, ReactRedux, ReactRouteDom } from 'lib/lib';
import { useEffect, useState } from 'react';

import { scheduleFetch } from 'services/ScheduleService';
import { TodaySeletor } from 'utils/TodaySeletor';

// styled
import { ScheduleGrid } from './MyScheduleStyle';

// import { dateFormating } from 'utils/DateFormat';

//그래프
// import ReactChat from 'react-apexcharts';
import UserProfile from 'component/profile/UserProfile';
import { FlexColumnDiv } from 'features/CommonStyles';
import ScheduleHeader from 'features/Myschedule/Layout/ScheduleHeader';
import ScheduleRoute from 'Route/ScheduleRoute';
import styled from 'styled-components';
import { keepPreviousData, useQueryClient } from '@tanstack/react-query';

// lib
const { useQuery } = ReactQuery;
const { useDispatch } = ReactRedux;
const { useSearchParams } = ReactRouteDom;

const CustumlexColumnDiv = styled(FlexColumnDiv)`
    padding: 2rem 2.5rem;
    border-radius: 2.5rem;
`;

export default function MySchedule() {
    const today = TodaySeletor(); //오늘날짜 계산
    const [selectDay, setSelectDay] = useState(today());
    const [param] = useSearchParams(new URL(window.location).searchParams);

    const getYear = param.get('year') || today().split('-')[0];
    const getMonth = param.get('month') || today().split('-')[1];

    // console.log('selectDay', selectDay);

    // console.log('getMonth', getMonth);

    // console.log(getYear, getMonth);

    //FetchData
    const [listData, setListData] = useState();
    const [DdayArr, setDdayArr] = useState();
    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    const { isSuccess, isError, error, data, dataUpdatedAt } = useQuery({
        queryKey: ['Schedule', +getMonth],
        queryFn: () => scheduleFetch(+getYear, +getMonth),
        staleTime: 10000,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        const ttt = queryClient.getQueryData(['Schedule', +getMonth]);
    }, [isSuccess, getMonth]);

    useEffect(() => {
        queryClient
            .prefetchQuery({
                queryKey: ['Schedule', +getMonth + 1],
                queryFn: () => scheduleFetch(getYear, +getMonth + 1),
            })
            .then(() => {
                const test = queryClient.getQueryData([
                    'Schedule',
                    +getMonth + 1,
                ]);
                // console.log('test ::: ', test);
            });
    }, [getYear, getMonth, queryClient]);

    useEffect(() => {
        if (isSuccess) {
            setListData(data.restResponseData);
            setDdayArr(data.D_Day);
        } else if (isError) {
            dispatch(alertThunk(error.message, 0));
        }
    }, [isSuccess, isError, data, error, dispatch]);

    return (
        <>
            <DashBoard page={'Calendar'}>
                {/* header */}
                <BannerCommon.BannerPoint>
                    <img src="/img/calendar.png" alt="calendar" />
                    MY STUDY
                </BannerCommon.BannerPoint>

                <DashBoardTitle>
                    <b>MY SCHEDULE</b>
                </DashBoardTitle>
            </DashBoard>

            <ScheduleGrid>
                {/* UserProFile */}
                {/* <UserProfile /> */}

                <CustumlexColumnDiv style={{ backgroundColor: '#fff' }}>
                    <ScheduleHeader />
                    {/* 서브 라우터 */}
                    <ScheduleRoute
                        setSelectDay={setSelectDay}
                        listData={listData}
                        selectDay={selectDay}
                        paramYear={getYear}
                        paramMonth={getMonth}
                        DdayArr={DdayArr}
                    />
                </CustumlexColumnDiv>
            </ScheduleGrid>
        </>
    );
}
