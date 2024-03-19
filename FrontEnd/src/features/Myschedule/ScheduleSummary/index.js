import { TodaySeletor } from 'utils/TodaySeletor';
import { filterByDate } from '../component/filterByOrder';
import PrograssBar from '../component/PrograssBar';
import { FlexColumnDiv } from 'features/CommonStyles';

const ScheduleSummary = props => {
    const { listData } = props;
    const today = TodaySeletor();

    // today
    const todayArr = filterByDate(listData, today());
    const categoryFilter = {};
    for (const item of todayArr) {
        if (!categoryFilter[item.category]) {
            categoryFilter[item.category] = [];
        }
        categoryFilter[item.category].push(item);
    }

    const categorys = Object.keys(categoryFilter);

    return (
        <FlexColumnDiv>
            {categorys.map((v, idx) => {
                const tasks = categoryFilter[v];
                return <PrograssBar tasks={tasks} key={`key-${idx}`} />;
            })}
        </FlexColumnDiv>
    );
};

export default ScheduleSummary;
