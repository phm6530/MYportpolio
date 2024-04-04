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
    padding: 2rem 2.8rem 1.8rem;
    box-shadow: 9px 16px 42.3px rgba(0, 0, 0, 0.06);
    border-radius: 47px;
    width: calc(50% - 2.8rem);
    /* border: 3px solid #f0e8ff; */
    position: relative;
    box-shadow: 7px 8px 25.6px rgba(199, 198, 217, 0.45);
    border-radius: 37px;

    .timer-icon {
        position: absolute;
        background: red;
        top: -14px;
        padding: 10px;
        border-radius: 3rem;
        background: #9864ef;
        svg {
            color: #fff;
            font-size: 25px;
        }
    }
    .stateMessage {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 1rem;
        display: block;
    }

    .time {
        letter-spacing: -0.05em;
        font-weight: bold;
        font-size: 32px;
        line-height: 36px;
        letter-spacing: -0.05em;

        background: linear-gradient(90deg, #9047a6 0%, #5072a8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    display: flex;
    flex-direction: column;
    span {
        font-weight: bold;
    }
`;

const Button = styled.button`
    /* Rectangle 12 */
    box-sizing: border-box;
    padding: 0.5rem 1.3rem;
    width: 50%;
    border-radius: 2rem;

    margin-top: 2rem;
    color: #4a5794;
    font-weight: bold;
    font-size: 12px;
    font-size: 14px;
    letter-spacing: -0.05em;

    color: #565b68;

    ${props => {
        if (props.$type === 'start') {
            return props.$on
                ? `
                    opacity: .5;
                    background: #fff;
                `
                : `
                box-shadow: 9px 16px 42.3px rgba(0, 0, 0, 0.06);
                border-radius: 19px;
                `;
        } else {
            return (
                props.$on ||
                `
                    opacity: .5;
                    background: #fff;`
            );
        }
    }}
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
    const startTimer = () => {
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
    };

    // End Timer
    const endTimer = () => {
        if (!clientAuthCheck('타이머')) return;

        setRunning(false);
        const nowTime = nowTIme();
        const fetchData = {
            endTime: nowTime[1],
            ...user,
        };
        endMutate(fetchData);
    };

    if (isLoading) {
        return <>loading....</>;
    }

    return (
        <>
            <StopWatchStyle>
                <div className="timer-icon">
                    <TfiTimer />
                </div>
                <div className="stateMessage">
                    {data?.timerData ? (
                        <span>지금 저는{timerData?.category} 중 입니다..</span>
                    ) : (
                        <HookformRadio
                            Radio={SCHEDULE_CATEGORY}
                            control={control}
                            errors={errors}
                            keyName={'category'}
                        />
                    )}
                </div>

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

                <FlexRow>
                    <Button
                        $type="start"
                        $on={running}
                        disabled={running}
                        onClick={() => startTimer()}
                    >
                        START
                    </Button>
                    <Button $on={running} onClick={() => endTimer()}>
                        STOP
                    </Button>
                </FlexRow>
            </StopWatchStyle>
        </>
    );
};

export default ScheduleTimer;
