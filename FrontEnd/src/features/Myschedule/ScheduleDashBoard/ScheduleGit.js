import { SubTitleTextStyle } from 'features/CommonStyles';
import { HourStyle } from '../component/styles/ScheduleCommonStyles';
import { FlexColumnDiv } from 'features/CommonStyles';
import styled from 'styled-components';
import { format } from 'date-fns';
import moment from 'moment-timezone';
import { FaGithub } from 'react-icons/fa';
const CustumHourStyle = styled(HourStyle)`
    margin-bottom: 0;
`;
import { ReactQuery } from 'lib/lib';
import { useEffect, useState } from 'react';
import { fetchGit } from 'services/ScheduleService';
const { useQuery } = ReactQuery;

const CustumFlexColumnDiv = styled(FlexColumnDiv)`
    flex-grow: initial;
    /* margin-left: 3rem; */
    width: 100%;
    font-size: 14px;
    .git_contents {
        font-size: 14px;
        margin-bottom: 0.8rem;
        background: #f7fbff;
        flex-grow: 1;
        width: 100%;
        padding: 0.5rem 1rem;
        border-radius: 0.7rem;
        .gitDate {
            font-weight: bold;
        }
    }
    .gitLink {
        display: flex;
        align-items: center;
        font-weight: bold;
        /* border: 1px solid #ebebeb; */
        /* padding: 0.5rem 1rem; */
        border-radius: 9.5rem;
        margin-bottom: 1rem;
        cursor: pointer;
        .gitCount {
            font-size: 1.1rem;
            color: rgba(114, 100, 239, 1);
            margin-left: 1rem;
        }
        svg {
            margin-right: 0.4rem;
            font-size: 1.5rem;
        }
    }
`;

const ScheduleGit = () => {
    const [commitCount, setCommitCount] = useState([]);

    // console.log(commitCount);

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
            // console.log(data);
            const commitList = filterCommit(data);
            setCommitCount(commitList);
        }
    }, [data]);
    if (!data) {
        return <>Loading......</>;
    }
    return (
        <CustumFlexColumnDiv>
            <div className="gitLink">
                <FaGithub /> Today Commit
                <span className="gitCount">{commitCount.length}</span>
            </div>

            {commitCount.map((e, idx) => (
                <div className="git_contents" key={idx}>
                    <div className="gitDate">{format(e.date, 'MM. dd')}</div>
                    {e.message.slice(8)}
                </div>
            ))}
        </CustumFlexColumnDiv>
    );
};

export default ScheduleGit;
