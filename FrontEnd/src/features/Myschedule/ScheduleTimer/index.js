import { TfiTimer } from 'react-icons/tfi';
import { FlexRow } from 'component/CommonStyle';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import alertThunk from 'store/alertTrunk';
import { useAuthCheck } from 'hooks/useAuthCheck';
import {
    fetchTimerSetting,
    fetchTimerStart,
    fetchTimerEnd,
} from 'services/tastTimerService';
import StopWatch from '../component/StopWatch';
import useWebSocket from 'services/useWebSocket';
import HookformRadio from '../component/HookformRadio';
import { useForm } from 'react-hook-form';
import { SCHEDULE_CATEGORY } from 'utils/constans';

const StopWatchStyle = styled.div`
    padding: 2rem 2rem 1.8rem;
    box-shadow: 9px 16px 42.3px rgba(0, 0, 0, 0.06);
    border-radius: 47px;

    position: relative;
    box-shadow: 7px 8px 25.6px rgba(199, 198, 217, 0.45);

    max-width: 330px;
    min-height: 400px;
    width: 100%;

    box-sizing: border-box;

    background: url(/img/board/board.jpg);
    background-size: cover;
    border: 10px solid #0000007a;
    box-shadow: 13px 28px 35.9px rgb(0 0 0 / 55%);
    border-radius: 51px;
    flex-direction: column;
    justify-content: space-between;
    width: 367px;

    .stateMessage {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        display: block;
        margin-bottom: auto;
        margin-top: 1rem;
        align-items: center;
        font-size: 14px;
        display: flex;
        img {
            width: 20px;
            margin-right: 0.5rem;
        }
        span {
            color: rgba(247, 213, 255, 0.85);
        }
    }

    display: flex;
    flex-direction: column;
`;

const ButtonToggle = styled.div`
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem;
    border-radius: 5rem;
    transition: all 0.5s ease;
    height: 52px;
    position: relative;
    border: 1px solid #ffffff45;
`;

const Button = styled.button`
    /* Rectangle 12 */
    box-sizing: border-box;
    width: 50%;
    height: 40px;
    left: 5px;
    top: 5px;
    position: absolute;
    border-radius: 3rem;
    font-size: 12px;
    transition: all 0.5s ease;
    letter-spacing: -0.1em;
    background: #fff;
    color: #000;
    ${props => (props.$running ? 'left:calc(50% - 5px)' : 'left: 5px')}
`;

const Today = styled.div`
    color: #fff;
    opacity: 0.5;
    margin-bottom: 0.3rem;
    /* 2024.04.05 */

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    letter-spacing: -0.05em;

    color: #ffffff;
`;

const ScheduleTimer = () => {
    const dispatch = useDispatch();
    const [timerData, setTimerData] = useState(null);
    const { user } = useSelector(state => state.authSlice);
    const { clientAuthCheck } = useAuthCheck();
    const [touched, setTouched] = useState();
    const {
        data: websoketData,
        status,
        sendMessage,
    } = useWebSocket('ws://localhost:8080');
    // console.log(websoketData);

    const [running, setRunning] = useState(false);

    console.log('runningrunningrunningrunning::: ', running);

    const nowTIme = () => {
        return format(new Date(), 'yyyy-MM-dd HH:mm:ss').split(' ');
    };

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['ScheduleTimer'],
        queryFn: fetchTimerSetting,
        refetchOnWindowFocus: false,
    });

    const {
        control,
        getValues,
        formState: { errors },
        reset,
        trigger,
        watch,
    } = useForm({
        defaultValues: {
            category: null,
        },
    });

    const { mutate: startMutate } = useMutation({
        mutationFn: data => fetchTimerStart(data),
        onSuccess: () => {
            dispatch(alertThunk('타이머 시작', 1));
            queryClient.invalidateQueries({
                queryKey: ['ScheduleTimer'],
            });
            setTouched(false);
            reset();
        },
    });

    const { mutate: endMutate } = useMutation({
        mutationFn: data => fetchTimerEnd(data),
        onSuccess: () => {
            dispatch(alertThunk('타이머 중지', 1));
            queryClient.invalidateQueries({
                queryKey: ['ScheduleTimer'],
            });
        },
    });

    const watchd = watch('category');

    useEffect(() => {
        if (touched) {
            trigger('category');
        }
    }, [watchd, touched, trigger]);

    useEffect(() => {
        if (data?.timerData) {
            setTimerData(data.timerData);
            setRunning(true);
        }
    }, [data]);

    // Start Timer
    const toggleHandler = running => {
        if (!running) {
            setTouched(true);
            trigger('category');
            const category = getValues('category');
            console.log(category);
            if (!category) return;

            if (!clientAuthCheck('타이머')) return;
            const nowTime = nowTIme();
            const fetchData = {
                startTime: nowTime[1],
                date: nowTime[0],
                category,
                ...user,
            };
            startMutate(fetchData);
        } else {
            if (!clientAuthCheck('타이머')) return;

            setRunning(false);
            const nowTime = nowTIme();
            const fetchData = {
                endTime: nowTime[1],
                ...user,
            };
            endMutate(fetchData);
        }
    };

    // End Timer

    const today = format(new Date(), 'yyyy.MM.dd');

    if (isLoading) {
        return <>loading....</>;
    }

    return (
        <>
            <StopWatchStyle>
                {/* <div className="timer-icon">
                    <TfiTimer />
                </div> */}
                <Today>{today}</Today>
                {data?.timerData ? (
                    <StopWatch
                        running={running}
                        date={data.timerData.date}
                        startTime={data.timerData.start_time}
                        endDate={data.timerData.end_time}
                    />
                ) : (
                    '지금은 진행중 인 Task가 없어요'
                )}

                <div className="stateMessage">
                    {data?.timerData ? (
                        <>
                            <img src="/img/contact/talk2.png" alt="kakao" />
                            <span>
                                지금 저는{timerData?.category} 중 입니다..
                            </span>
                        </>
                    ) : (
                        <HookformRadio
                            Radio={SCHEDULE_CATEGORY}
                            control={control}
                            errors={errors}
                            keyName={'category'}
                        />
                    )}
                </div>
                <FlexRow>
                    <ButtonToggle>
                        <Button
                            $running={running}
                            // disabled={running}
                            onClick={() => toggleHandler(running)}
                        >
                            {!running ? 'START' : 'END'}
                        </Button>
                        {/* <Button $on={running} onClick={() => endTimer()}>
                            STOP
                        </Button> */}
                    </ButtonToggle>
                </FlexRow>
            </StopWatchStyle>
        </>
    );
};

export default ScheduleTimer;
