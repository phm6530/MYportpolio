import styled from 'styled-components';

const StopWatch = styled.div`
    align-items: center;
    .time {
        color: #fff;
        font-weight: bold;
        font-size: 50px;
    }
    width: 100%;
    display: flex;
    align-items: flex-end;
    span {
        font-weight: bold;
        color: #fff;
    }
`;

const ScheduleTimer = () => {
    const [timer, setTimer] = useState({
        Hour: 0,
        minit: 0,
        second: 0,
    });
    const [id, setId] = useState();

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
        const timer = TimerFunc();
        return () => clearInterval(timer);
    }, []);

    // Start Timer
    const startTimer = () => {
        const timer = TimerFunc();
        setId(timer);
    };

    // End Timer
    const endTimer = () => {
        clearInterval(id);
    };

    const TimerFormetting = target => {
        return String(target).padStart(2, 0);
    };

    return (
        <>
            <StopWatch>
                <span>study Timer : </span>
                <div className="time">
                    {TimerFormetting(timer.Hour)} : {TimerFormetting(timer.minit)} : {TimerFormetting(timer.second)}
                </div>
                <button onClick={() => startTimer()}>START</button>
                <button onClick={() => endTimer()}>STOP</button>
            </StopWatch>
        </>
    );
};

export default ScheduleTimer;
