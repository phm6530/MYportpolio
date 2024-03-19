import styled from 'styled-components';
import Gird from '../../component/ui/Grid';
import Calendar from 'features/Myschedule/Calendar';

const ScheduleGrid = styled(Gird)`
    padding-top: 25rem;
    display: flex;
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1.5rem;
`;

const CalendarStyle = styled(Calendar)`
    /* width: 50%; */
`;

export { ScheduleGrid, CalendarStyle, ContentsWrap };
