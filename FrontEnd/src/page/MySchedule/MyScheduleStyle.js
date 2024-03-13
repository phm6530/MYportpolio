import styled from 'styled-components';
import Gird from '../../component/ui/Grid';
import Calendar from 'features/Myschedule/Calendar';

const FlexColumnGird = styled(Gird)`
    padding-top: 25rem;
    display: flex;
    flex-direction: column;
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    margin-top: 1.5rem;
`;

const CalendarStyle = styled(Calendar)`
    width: 30%;
`;

export { FlexColumnGird, CalendarStyle, ContentsWrap };
