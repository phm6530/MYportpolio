import useCategoryFilter from 'hooks/useCategoryFilter';
import CategoryGraph from '../ScheduleSummary/CategoryGraph';
import styled from 'styled-components';
import { TodaySeletor } from 'utils/TodaySeletor';
import { Button } from 'component/ui/Button';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Popup from 'component/popup/Popup';
import ScheduleDdaySetter from '../component/ScheduleDdaySetter';

const ButtonNavWrap = styled.div`
    border-radius: 1em;
    /* color: #fff; */
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

            <div className="flex-row-wrap">
                <div className="flex-column-wrap">
                    <ButtonNavWrap>
                        <Button.ForsquareBtn onClick={() => todayButton()}>
                            ToDay
                        </Button.ForsquareBtn>
                        <Button.ForsquareBtn onClick={() => DdayPopupShow()}>
                            D-day 설정
                        </Button.ForsquareBtn>
                    </ButtonNavWrap>
                </div>

                {/* 카테고리 */}
                <CategoryGraph
                    selectDay={selectDay}
                    viewRage={viewRage}
                    categorys={cateGorys}
                    arrState={categoryFilter}
                />
            </div>
        </>
    );
};

export default TaskNav;
