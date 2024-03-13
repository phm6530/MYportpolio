import { FlexRow } from 'component/CommonStyle';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StopWatch = styled.div`
    background: #fff;
    padding: 2rem;
    width: 30%;

    .time {
        font-weight: bold;
        font-size: 50px;
        letter-spacing: -0.07em;
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
    padding: 0.6rem 0.8rem;
    background: #6653af;
    border-radius: 2rem;
    margin: 0.5rem;
    color: #fff;
    font-size: 14px;
    ${props => props.$on && ''}
`;

const ScheduleTimer = () => {
    const [timer, setTimer] = useState({
        Hour: 0,
        minit: 0,
        second: 0,
    });
    const [id, setId] = useState();
    const [running, setRunning] = useState(false);
    // console.log(timer);

    //Timer Func
    const TimerFunc = () => {
        const timer = setInterval(() => {
            setTimer(prev => {
                let NextSeond = prev.second + 1;
                let NextMinit = prev.minit;
                let NextHour = prev.Hour;

                if (NextSeond === 60) {
                    NextMinit++;
                    NextSeond = 0;
                }

                if (NextMinit === 60) {
                    NextHour++;
                    NextMinit = 0;
                }

                return { ...prev, Hour: NextHour, minit: NextMinit, second: NextSeond };
            });
        }, 1000);
        setId(timer);
        return timer;
    };

    //setting Timer
    useEffect(() => {
        // const timer = TimerFunc();
        return () => clearInterval(timer);
    }, []);

    // Start Timer
    const startTimer = () => {
        const timer = TimerFunc();
        setId(timer);
        setRunning(true);
    };

    // End Timer
    const endTimer = () => {
        clearInterval(id);
        setRunning(false);
    };

    const TimerFormetting = target => {
        return String(target).padStart(2, 0);
    };

    return (
        <>
            <StopWatch>
                Coding Timer
                <div className="time">
                    {TimerFormetting(timer.Hour)} : {TimerFormetting(timer.minit)} : {TimerFormetting(timer.second)}
                </div>
                <FlexRow>
                    <Button $on={running} onClick={() => startTimer()}>
                        START
                    </Button>
                    <Button $on={running} onClick={() => endTimer()}>
                        STOP
                    </Button>
                </FlexRow>
            </StopWatch>
        </>
    );
};

export default ScheduleTimer;
