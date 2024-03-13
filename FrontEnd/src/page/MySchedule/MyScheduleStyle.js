import styled from 'styled-components';
import Gird from '../../component/ui/Grid';
import Calendar from 'features/Myschedule/Calendar';

const CalenaderGrid = styled(Gird)`
    padding-top: 25rem;
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CalendarStyle = styled(Calendar)`
    width: 30%;
`;

export { CalenaderGrid, CalendarStyle, ContentsWrap };
