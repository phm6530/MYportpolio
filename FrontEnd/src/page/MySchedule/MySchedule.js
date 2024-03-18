import DashBoard from '../../component/ui/DashBoard';

import BannerCommon from 'component/ui/BannerCommon';
import DashBoardTitle from 'component/ui/DashBoardTitle';

import ScheduleContainer from 'features/Myschedule/ScheduleContainer';
import alertThunk from 'store/alertTrunk';
import FadeinComponent from 'FadeinComponent';

import { ReactQuery, ReactRedux, ReactRouteDom } from 'lib/lib';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { scheduleFetch } from 'services/ScheduleService';
import { TodaySeletor } from 'utils/TodaySeletor';
import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';

// styled
import { ScheduleGrid, CalendarStyle, ContentsWrap } from './MyScheduleStyle';
import { FlexRow } from 'component/CommonStyle';
import ScheduleTimer from 'features/Myschedule/ScheduleTimer';

// import { dateFormating } from 'utils/DateFormat';

//그래프
import ReactChat from 'react-apexcharts';
import UserProfile from 'component/profile/UserProfile';
import { FlexColumnDiv } from 'features/CommonStyles';
import ScheduleHeader from 'features/Myschedule/Layout/ScheduleHeader';
import ScheduleRoute from 'Route/ScheduleRoute';

// lib
const { useQuery } = ReactQuery;
const { useDispatch } = ReactRedux;
const { useSearchParams } = ReactRouteDom;

export default function MySchedule() {
    const today = TodaySeletor(); //오늘날짜 계산
    const [selectDay, setSelectDay] = useState(today());
    const [param] = useSearchParams(new URL(window.location).searchParams);

    const getYear = param.get('year') || today().split('-')[0];
    const getMonth = param.get('month') || today().split('-')[1];

    //FetchData
    const [listData, setListData] = useState();
    const [DdayArr, setDdayArr] = useState();
    const dispatch = useDispatch();

    useQuery(['Schedule', getMonth], () => scheduleFetch(getYear, getMonth), {
        refetchOnWindowFocus: false,
        onSuccess: data => {
            setListData(data.restResponseData);
            setDdayArr(data.D_Day);
        },
        onError: error => {
            dispatch(alertThunk(error.message, 0));
        },
    });

    return (
        <>
            <DashBoard page={'Calendar'}>
                {/* header */}
                <BannerCommon.BannerPoint>
                    <img src="img/calendar.png" alt="calendar" />
                    MY STUDY
                </BannerCommon.BannerPoint>

                <DashBoardTitle>
                    <b>MY SCHEDULE</b>
                </DashBoardTitle>
            </DashBoard>

            <ScheduleGrid>
                {/* UserProFile */}
                <UserProfile />

                <FlexColumnDiv>
                    {/*  */}
                    <ScheduleHeader />

                    {/* 서브 라우터 */}
                    <ScheduleRoute />
                </FlexColumnDiv>
            </ScheduleGrid>
        </>
    );
}
