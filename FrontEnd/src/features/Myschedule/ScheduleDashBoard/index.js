import styled from 'styled-components';

import ScheduleMainFoucs from './ScheduleMainFoucs';

import { FlexWrapDiv } from 'features/CommonStyles';

// import { ReactQuery } from 'lib/lib';
// const { useQuery } = ReactQuery;

const DashBoardStyle = styled.div`
    /* Rectangle 148 */
    width: 40%;
    display: flex;
    flex-grow: 1;
    margin-left: 2rem;
    border-radius: 2rem;
    align-items: center;
`;

// const SubDescriptionStyle = styled.div`
//     font-weight: 500;
//     font-size: 14px;
//     line-height: 1.5rem;
//     color: #7e96a6;
//     margin-bottom: 2.5rem;
// `;
const ConTentsWrapStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CustumFlexWrapDiv = styled(FlexWrapDiv)`
    margin-left: 2rem;
    align-items: flex-start;
`;

const ScheduleDashBoard = () => {
    return (
        <DashBoardStyle>
            <ConTentsWrapStyle>
                {/* <div className="margin-bottom-2rem">
                    <ScheduleSelectBox />
                </div> */}

                {/* <SchedulePrograss /> */}

                <CustumFlexWrapDiv>
                    <ScheduleMainFoucs />
                    <ScheduleMainFoucs show={'hour'} />
                </CustumFlexWrapDiv>
            </ConTentsWrapStyle>
        </DashBoardStyle>
    );
};

export default ScheduleDashBoard;
