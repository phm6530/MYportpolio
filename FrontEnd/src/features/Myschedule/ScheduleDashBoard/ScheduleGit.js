import { SubTitleTextStyle } from 'features/CommonStyles';
import { HourStyle } from '../component/styles/ScheduleCommonStyles';
import { FlexColumnDiv } from 'features/CommonStyles';
import styled from 'styled-components';
import { format } from 'date-fns';
import moment from 'moment-timezone';

const CustumHourStyle = styled(HourStyle)`
    margin-bottom: 0;
`;
import { ReactQuery } from 'lib/lib';
import { useEffect, useState } from 'react';
import { fetchGit } from 'services/ScheduleService';
const { useQuery } = ReactQuery;

const ScheduleGit = () => {
    const [commitCount, setCommitCount] = useState([]);

    const { data } = useQuery({
        queryKey: ['git'],
        queryFn: fetchGit,
    });

    const today = new Date();
    // console.log(today.toISOString());

    // const now = new Date(); // 서버 시간 기준 현재 로컬 시간
    // const GMTNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // GMT 현재 시간
    // const KoreaTimeDiff = 9 * 60 * 60 * 1000;
    // const KoreaNow = new Date(GMTNow + KoreaTimeDiff);
    // console.log(KoreaNow);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        // console.log(ttt);
        const filterCommit = data => {
            const todayData = data.filter(e => {
                const UTCtoksTime = moment(e.commit.committer.date)
                    .tz('Asia/Seoul')
                    .format('YYYY-MM-DD HH:mm:ss')
                    .split(' ')[0];
                return UTCtoksTime === today;
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
            {commitCount.map((e, idx) => (
                <div key={idx}>{e.message}</div>
            ))}
        </FlexColumnDiv>
    );
};

export default ScheduleGit;
