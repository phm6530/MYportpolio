import { TfiTimer } from 'react-icons/tfi';
import { FlexRow } from 'component/CommonStyle';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StopWatch = styled.div`
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
        /* font-size: 50px;
        background: linear-gradient(90deg, #8b80e6 0%, #443a8f 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
         */
        /* 05:20:01 */

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

                return {
                    ...prev,
                    Hour: NextHour,
                    minit: NextMinit,
                    second: NextSeond,
                };
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
                <div className="timer-icon">
                    <TfiTimer />
                </div>
                <div className="stateMessage">
                    지금 저는 ‘Coding’ 중입니다..
                </div>
                <div className="time">
                    {TimerFormetting(timer.Hour)} :
                    {TimerFormetting(timer.minit)} :
                    {TimerFormetting(timer.second)}
                </div>
                <FlexRow>
                    <Button
                        $type="start"
                        $on={running}
                        onClick={() => startTimer()}
                    >
                        START 16:00
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
