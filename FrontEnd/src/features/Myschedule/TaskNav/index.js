import useCategoryFilter from 'hooks/useCategoryFilter';
import CategoryGraph from '../ScheduleSummary/CategoryGraph';
import styled from 'styled-components';
import { TodaySeletor } from 'utils/TodaySeletor';
import { Button } from 'component/ui/Button';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Popup from 'component/popup/Popup';
import ScheduleDdaySetter from '../component/ScheduleDdaySetter';
import { format } from 'date-fns';
import TotalGraph from '../component/TotalGraph';

const ButtonNavWrap = styled.div`
    border-radius: 1em;

    /* box-shadow:
        -4px -4px 15px rgba(255, 255, 255, 0.7),
        4px 4px 15px rgba(36, 36, 36, 0.15); */
    /* width: 100%; */
    /* padding: 10px; */
    border-radius: 1em;
    display: flex;
    justify-content: flex-start;
    /* margin-bottom: 2rem; */
`;

const CategoryGraphStyle = styled(CategoryGraph)`
    width: 50%;
`;

const SelelctDayDescript = styled.div`
    /* width: 40%; */
    border-bottom: 1px solid #7d879c4a;
`;

const Day = styled.div`
    font-size: 31px;
    line-height: 38px;
    letter-spacing: -1px;
    /* margin-bottom: 1rem; */
    font-family: 'Poppins';
    color: #3c485f;
    span {
        letter-spacing: -1px;
        display: inline-block;
        font-size: 1.1rem;
        opacity: 0.5;
        font-weight: normal;
    }
`;

const FontWrapper = styled.div`
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
    display: flex;
    /* border: 1px solid #7cb7e130; */
    background: #fff;

    padding: 2rem;
    border-bottom: 1px solid #7d879c4a;
`;

const SubDescription = styled.div`
    margin-bottom: 1rem;
    font-size: 0.9rem;
    opacity: 0.7;
`;

const TaskNav = ({ listData = {}, selectDay, setSelectDay }) => {
    const { cateGorys, categoryFilter, viewRage } = useCategoryFilter({
        listData,
        selectDay,
    });
    const [dDayForm, setDdayForm] = useState(false);
    const [, setSeachParam] = useSearchParams();

    const todayButton = () => {
        setSelectDay(today());
        setSeachParam({
            year: today().split('-')[0],
            month: today().split('-')[1],
        });
    };

    // // 현재 URL의 검색 파라미터 객체 생성
    // const searchParams = new URLSearchParams(window.location.search);

    // // 검색 파라미터 수정
    // searchParams.set('year', todayStr.split('-')[0]);
    // searchParams.set('month', todayStr.split('-')[1]);

    const DdayPopupShow = () => {
        setDdayForm(prev => !prev);
    };

    const today = TodaySeletor();

    // console.log('selectDay', selectDay);
    return (
        <>
            {dDayForm && (
                <Popup closePopup={() => setDdayForm(false)}>
                    <ScheduleDdaySetter />
                </Popup>
            )}

            <SelelctDayDescript>
                <FontWrapper>
                    <Day>MY TASK</Day>

                    <ButtonNavWrap>
                        <Button.ForsquareBtn onClick={() => todayButton()}>
                            ToDay
                        </Button.ForsquareBtn>
                        <Button.ForsquareBtn onClick={() => DdayPopupShow()}>
                            D-day 설정
                        </Button.ForsquareBtn>
                    </ButtonNavWrap>
                </FontWrapper>
                <SubDescription>
                    {format(selectDay, 'yyyy. MM. dd')} 일의 일정을 기록합니다.
                </SubDescription>
            </SelelctDayDescript>

            {/* 카테고리 */}
            <Wrapper>
                <TotalGraph
                    selectDateRange={[selectDay]}
                    viewRage={viewRage}
                    arrState={categoryFilter}
                />

                <CategoryGraphStyle
                    selectDay={selectDay}
                    viewRage={viewRage}
                    categorys={cateGorys}
                    arrState={categoryFilter}
                />
            </Wrapper>
        </>
    );
};

export default TaskNav;
