import SubTitle from 'component/ui/Subtitle';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';
import ScheduleSelectBox from './SchduleSelectBox';
import SchedulePrograss from './SchedulePrograss';
import ScheduleMainFoucs from './ScheduleMainFoucs';
import ScheduleGit from './ScheduleGit';

import { FlexRowDiv, FlexColumnBetween } from 'features/CommonStyles';
import { fetchGit } from 'services/ScheduleService';
import { useQuery } from 'react-query';

const DashBoardStyle = styled.div`
    /* Rectangle 148 */

    display: flex;
    padding: 3rem 5rem;
    /* background: #f8fbfd; */
    background: #fff;
    flex-grow: 1;
    border-radius: 2rem;
    margin-right: 1.5rem;
`;

const SubDescriptionStyle = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5rem;
    color: #7e96a6;
    margin-bottom: 2.5rem;
`;
const ConTentsWrapStyle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 4rem;
    flex-grow: 1;
    justify-content: space-between;
`;

const ScheduleDashBoard = () => {
    useQuery('git', fetchGit, {
        onSuccess: data => {
            console.log(data);
        },
        onError: error => {
            console.log(error);
        },
    });
    return (
        <DashBoardStyle>
            <FlexColumnBetween>
                <SubTitle>
                    <div className="subText">
                        <div className="point">MY SCHEDULES</div>
                    </div>
                </SubTitle>
                <SubDescriptionStyle>3. 18일</SubDescriptionStyle>
                <Button.SubmitButton active={true}>VIEW</Button.SubmitButton>
            </FlexColumnBetween>

            <ConTentsWrapStyle>
                <div className="margin-bottom-2rem">
                    <ScheduleSelectBox />
                </div>

                <SchedulePrograss />

                <FlexRowDiv>
                    <ScheduleMainFoucs />
                    <ScheduleGit />
                </FlexRowDiv>
            </ConTentsWrapStyle>
        </DashBoardStyle>
    );
};

export default ScheduleDashBoard;
