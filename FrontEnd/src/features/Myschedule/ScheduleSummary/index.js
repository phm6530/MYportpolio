import { FlexWrapDiv } from 'features/CommonStyles';
import SummaryHeader from '../ScheduleDashBoard/SummaryHeader';
import TotalGraph from '../component/TotalGraph';
import CategoryGraph from './CategoryGraph';

import styled from 'styled-components';
import useCategoryFilter from 'hooks/useCategoryFilter';

const CustumFlexWrapDiv = styled(FlexWrapDiv)``;

const ScheduleSummary = props => {
    const { listData, selectDay } = props;
    // console.log(props);

    const {
        cateGorys,
        selectDateRange,
        categoryFilter: arrState,
        setViewRage,
        viewRage,
    } = useCategoryFilter({
        listData,
    });

    return (
        <>
            <CustumFlexWrapDiv>
                <SummaryHeader viewRage={viewRage} setViewRage={setViewRage} />
                {arrState && (
                    <TotalGraph
                        selectDateRange={selectDateRange}
                        viewRage={viewRage}
                        arrState={arrState}
                        {...props}
                    />
                )}
                {/* CategoryGraph */}
                <CategoryGraph
                    selectDay={selectDay}
                    viewRage={viewRage}
                    categorys={cateGorys}
                    arrState={arrState}
                />
            </CustumFlexWrapDiv>
        </>
    );
};

export default ScheduleSummary;
