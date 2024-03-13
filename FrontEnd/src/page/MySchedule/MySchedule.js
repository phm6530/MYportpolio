import DashBoard from '../../component/ui/DashBoard';

import BannerCommon from 'component/ui/BannerCommon';
import DashBoardTitle from 'component/ui/DashBoardTitle';

import ScheduleContainer from 'features/Myschedule/ScheduleContainer';
import alertThunk from 'store/alertTrunk';
import FadeinComponent from 'FadeinComponent';

import { ReactQuery, ReactRedux, ReactRouteDom } from 'lib/lib';
import { useState } from 'react';

import { scheduleFetch } from 'services/ScheduleService';
import { TodaySeletor } from 'utils/TodaySeletor';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';

// styled
import { CalenaderGrid, CalendarStyle, ContentsWrap } from './MyScheduleStyle';

// import { dateFormating } from 'utils/DateFormat';

//그래프
// import ReactChat from 'react-apexcharts';

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

            <CalenaderGrid>
                <FadeinComponent>
                    <ContentsWrap>
                        {/* body */}
                        <CalendarStyle
                            setSelectDay={setSelectDay}
                            listData={listData}
                            selectDay={selectDay}
                            paramYear={getYear}
                            paramMonth={getMonth}
                        />

                        {/* D-day 영역 */}
                        <ScheduleDdayList DdayTasks={DdayArr} />

                        {/* Schedule */}
                        <ScheduleContainer selectDay={selectDay} listData={listData} setSelectDay={setSelectDay} />
                    </ContentsWrap>
                </FadeinComponent>
            </CalenaderGrid>
        </>
    );
}
