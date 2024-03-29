import useCategoryFilter from 'hooks/useCategoryFilter';
import CategoryGraph from '../ScheduleSummary/CategoryGraph';

const TaskNav = ({ listData = {}, selectDay }) => {
    const { cateGorys, categoryFilter, viewRage } = useCategoryFilter({
        listData,
        selectDay,
    });

    console.log('selectDay', selectDay);
    return (
        <div className="flex-row-wrap">
            <div className="flex-column-wrap">asf</div>

            {/* 카테고리 */}
            <CategoryGraph
                viewRage={viewRage}
                categorys={cateGorys}
                arrState={categoryFilter}
            />
        </div>
    );
};

export default TaskNav;
