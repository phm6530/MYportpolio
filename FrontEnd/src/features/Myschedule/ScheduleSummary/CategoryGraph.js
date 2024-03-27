import { dayFormetting } from 'utils/TodaySeletor';
import { filterByDate } from '../component/filterByOrder';
import PrograssBar from '../component/PrograssBar';
import { FlexColumnDiv } from 'features/CommonStyles';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CustumFlexColumnDiv = styled(FlexColumnDiv)`
    /* max-width: 300px; */
    margin-left: 2rem;
    .CategoryWrapTitle {
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.08em;
        display: inline-block;
        margin-bottom: 1rem;
        color: #7b7d93;
    }
`;

const CategoryGraph = props => {
    const { categorys, arrState } = props;

    // console.log(arrState);
    return (
        <>
            <CustumFlexColumnDiv>
                <span className="CategoryWrapTitle">카테고리 별 완료도</span>
                {categorys &&
                    categorys.map((v, idx) => {
                        const tasks = arrState[v];
                        return <PrograssBar tasks={tasks} key={`key-${idx}`} />;
                    })}
            </CustumFlexColumnDiv>
        </>
    );
};

export default CategoryGraph;
