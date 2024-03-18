const MyScheduleLayOut = () => {
    return (
        <>
            <FlexColumnDiv>
                <ScheduleDashBoard />
                {/* 타이머 */}
                <ScheduleTimer />

                <ContentsWrap>
                    {/* body */}

                    {/* D-day 영역 */}
                    <ScheduleDdayList DdayTasks={DdayArr} />

                    <CalendarStyle
                        setSelectDay={setSelectDay}
                        listData={listData}
                        selectDay={selectDay}
                        paramYear={getYear}
                        paramMonth={getMonth}
                    />

                    {/* Schedule Control*/}
                    <ScheduleContainer
                        selectDay={selectDay}
                        listData={listData}
                        setSelectDay={setSelectDay}
                    />
                </ContentsWrap>
            </FlexColumnDiv>
        </>
    );
};

export default MyScheduleLayOut;
