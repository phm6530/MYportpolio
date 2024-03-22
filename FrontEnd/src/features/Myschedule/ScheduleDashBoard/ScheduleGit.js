import { SubTitleTextStyle } from 'features/CommonStyles';
import { HourStyle } from '../component/styles/ScheduleCommonStyles';
import { FlexColumnDiv } from 'features/CommonStyles';
import styled from 'styled-components';
import { format } from 'date-fns';

const CustumHourStyle = styled(HourStyle)`
    margin-bottom: 0;
`;
import { ReactQuery } from 'lib/lib';
import { useEffect, useState } from 'react';
import { fetchGit } from 'services/ScheduleService';
const { useQuery } = ReactQuery;

const ScheduleGit = () => {
    const [commitCount, setCommitCount] = useState([]);

    const { data, isLoading } = useQuery({
        queryKey: ['git'],
        queryFn: fetchGit,
    });
    console.log(commitCount);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const offset = new Date().getTimezoneOffset() * 60000; // 현재 로컬 시간대와 UTC의 차이(밀리초 단위)
        const kstOffset = 9 * 60 * 60 * 1000; // KST는 UTC+9
        const todays = new Date(Date.now() - offset + kstOffset)
            .toISOString()
            .split('T')[0];

        console.log(todays);

        // const ttt = format(today, 'yyyy-MM-dd');
        // console.log(ttt);
        const filterCommit = data => {
            const todayData = data.filter(e => {
                return e.commit.committer.date.split('T')[0] === today;
            });
            return todayData.map(e => ({
                message: e.commit.message,
                date: e.commit.committer.date.split('T')[0],
            }));
        };
        if (data) {
            const commitList = filterCommit(data);
            setCommitCount(commitList);
        }
    }, [data]);
    if (!data) {
        return <>Loading......</>;
    }
    return (
        <FlexColumnDiv>
            <SubTitleTextStyle>Git Commit Today</SubTitleTextStyle>
            <CustumHourStyle>{commitCount.length}</CustumHourStyle>
            {commitCount.map(e => (
                <div>{e.message}</div>
            ))}
        </FlexColumnDiv>
    );
};

export default ScheduleGit;
