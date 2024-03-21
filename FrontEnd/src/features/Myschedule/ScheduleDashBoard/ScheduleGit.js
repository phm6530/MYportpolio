import { SubTitleTextStyle } from 'features/CommonStyles';
import { HourStyle } from '../component/styles/ScheduleCommonStyles';
import { FlexColumnDiv } from 'features/CommonStyles';
import styled from 'styled-components';

const CustumHourStyle = styled(HourStyle)`
    margin-bottom: 0;
`;
import { ReactQuery } from 'lib/lib';
import { useEffect, useState } from 'react';
import { fetchGit } from 'services/ScheduleService';
const { useQuery } = ReactQuery;

const ScheduleGit = () => {
    const [commitCount, setCommitCount] = useState([]);

    const { data, isSuccess } = useQuery({
        queryKey: ['git'],
        queryFn: fetchGit,
    });

    console.log(commitCount);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        const filterCommit = data => {
            return data.filter(e => {
                return e.commit.committer.date.split('T')[0] === today;
            });
        };

        if (data) {
            const commitList = filterCommit(data);
            setCommitCount(commitList);
        }
    }, [data]);

    const Commit = 2;
    return (
        <FlexColumnDiv>
            <SubTitleTextStyle>Git Commit</SubTitleTextStyle>
            <CustumHourStyle>{commitCount.length}</CustumHourStyle>
        </FlexColumnDiv>
    );
};

export default ScheduleGit;
