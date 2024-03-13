import styled from 'styled-components';
const SummeryStyle = styled.div`
    background: #fff;
    border-radius: 1em;
    flex-grow: 1;
    margin: 0 20px;
`;

const DdayTaskStyle = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 15px;
    border-radius: 0.5em;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    p {
        font-size: 14px;
        padding-bottom: 6px;
    }
    span {
        font-weight: bold;
        margin-left: auto;
    }
`;

const ScheduleDdayList = ({ DdayTasks }) => {
    const DdayTask = ({ task }) => {
        const { work, schedule_key, formatted_date } = task;
        const currentDate = new Date();
        const taskDate = new Date(formatted_date);
        const dayDifference = (currentDate - taskDate) / (1000 * 3600 * 24);
        const count = Math.ceil(dayDifference);
        return (
            <DdayTaskStyle>
                <p>{work}</p>
                <span>D {count}</span>
                {/* <span>{formatted_date}</span> */}
            </DdayTaskStyle>
        );
    };

    return (
        <SummeryStyle>
            {DdayTasks &&
                DdayTasks.map((task, idx) => {
                    return <DdayTask key={`DdayTask-${idx}`} task={task} />;
                })}
        </SummeryStyle>
    );
};

export default ScheduleDdayList;
