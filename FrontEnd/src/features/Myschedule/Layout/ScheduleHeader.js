import { Link, useLocation } from 'react-router-dom';
import SubTitle from 'component/ui/Subtitle';

const ScheduleHeader = () => {
    const { pathname } = useLocation();

    return (
        <>
            <SubTitle>
                <div className="subText">
                    <div className="point">MY SCHEDULES</div>
                </div>
            </SubTitle>
            <Link to={`/myschedule`}>FFF</Link>
            <Link to={`/myschedule/task`}>Task</Link>
            <Link to={`/myschedule/report`}>Report</Link>
        </>
    );
};

export default ScheduleHeader;
