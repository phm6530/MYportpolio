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
import useTimer from 'hooks/useTimer';

const StopWatchStyle = styled.div`
    padding: 2rem 2rem 1.8rem;
    box-shadow: 9px 16px 42.3px rgba(0, 0, 0, 0.06);
    border-radius: 47px;
    position: relative;
    box-shadow: 7px 8px 25.6px rgba(199, 198, 217, 0.45);
    max-width: 330px;
    min-height: 380px;
    width: 100%;
    box-sizing: border-box;
    background: url(/img/board/board.jpg);
    background-size: cover;
    border-radius: 30px;
    flex-direction: column;
    justify-content: space-between;
    width: 318px;

    background: linear-gradient(
        180deg,
        #7b69e7 0%,
        #7498de 100%,
        #c981cb 100.01%
    );
    box-shadow: 8px 8px 23.4px rgba(0, 0, 0, 0.25);
    border-radius: 43px;

    .stateMessage {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        display: block;
        margin-bottom: auto;
        margin-top: 1rem;
        align-items: center;
        font-size: 14px;
        text-align: center;
        display: flex;
        box-sizing: border-box;
        border-radius: 36px;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 3px 4px 18px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
        padding-left: 1rem;

        img {
            width: 20px;
            margin-right: 0.5rem;
            filter: grayscale(1);
        }
        .on {
            text-align: center;
            color: #fff;
            position: relative;
            padding-left: 20px;
            &::after {
                position: absolute;
                display: block;
                content: '';
                width: 5px;
                height: 5px;
                background: red;
                left: 0;
                top: 50%;

                background: linear-gradient(0deg, #51f1d4, #51f1d4);
                box-shadow: 0px 0px 2.2px #40d5b9;
                border-radius: 9px;
                transform: translateY(-50%);
            }
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

    background: rgba(0, 0, 0, 0.06);
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

    background: #ffffff;
    box-shadow: 0px 4px 10.2px rgba(0, 0, 0, 0.25);
    border-radius: 36px;

    ${props => (props.$running ? 'left:calc(50% - 5px)' : 'left: 5px')}
`;

const Today = styled.div`
    color: #fff;
    opacity: 0.5;
    margin-bottom: 0.3rem;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.05em;
    color: #ffffff;
`;

const ScheduleTimer = () => {
    const dispatch = useDispatch();
    const [timerData, setTimerData] = useState(null);
    const { user } = useSelector(state => state.authSlice);
    const { clientAuthCheck } = useAuthCheck();
    const [touched, setTouched] = useState();
    const { data, isLoading, getWebsoketTimer } = useTimer();

    const { data: websoketData } = useWebSocket('ws://localhost:8080');
    const [running, setRunning] = useState(false);

    const nowTIme = () => {
        return format(new Date(), 'yyyy-MM-dd HH:mm:ss').split(' ');
    };

    const queryClient = useQueryClient();

    useEffect(() => {
        // console.log('websoketData', websoketData);
        if (websoketData) {
            getWebsoketTimer();
        }
    }, [websoketData, getWebsoketTimer]);

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
                            {/* <img src="/img/contact/talk2.png" alt="kakao" /> */}
                            <div className="on">
                                지금 저는 &#39; {timerData?.category} &#39; 중
                                입니다..
                            </div>
                        </>
                    ) : (
                        <HookformRadio
                            options={SCHEDULE_CATEGORY}
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
