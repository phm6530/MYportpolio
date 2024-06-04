import styled from 'styled-components';

export const PageSubText = styled.div`
    font-size: 20px;
    margin-bottom: 70px;
    background: #fff;
    padding: 2rem;

    p {
        font-size: 14px;
        color: #fff;
        opacity: 0.7;
        padding-top: 20px;
    }
`;
export const SummaryType = styled.div`
    display: inline-flex;
    font-size: 0.9rem;
    margin-bottom: 0.7rem;
    margin-right: 1rem;
    align-items: center;
`;

export const SummaryWrap = styled.div`
    display: flex;
    border-bottom: 1px solid var(--borer-line-color);
    align-items: flex-start;
    margin-bottom: 3rem;
`;

export const SkillWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const SummaryWrapper = styled.div`
    margin-bottom: 1.8rem;
    width: 44.5%;
    align-items: flex-start;
    width: 49%;
    border-radius: 1rem;
`;

export const ProjectTitle = styled.div`
    font-size: 2rem;
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

export const ProjectWrapStyle = styled.div`
    flex-direction: column;
    border-radius: 1em;
    /* background: var(--color-background); */
    /* border: var(--border--btn-type-1); */
    flex-grow: 1;
    overflow: hidden;
    padding: 0 2rem;
    display: flex;
    align-items: flex-start;
`;

export const Src = styled.div`
    color: #3963a7;
    text-decoration: underline;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    width: 100%;
    &:hover {
        color: #0d68fb;
    }
`;

export const SKill = styled.span`
    display: inline-block;
    /* color: #555969; */
    border-radius: 18px;
    font-size: 16px;
    margin-right: 13px;
    display: flex;
    font-weight: bold;
`;

export const CustumStyle = styled(ProjectWrapStyle)`
    padding: 4rem 0;
    /* padding: 2rem 5rem;
    margin-top: -3rem;
    background: #fff;
    border-radius: 6rem; */
`;

export const ProjectSummary = styled.div`
    margin-bottom: 1rem;
    width: 100%;
    .title {
        font-size: 2rem;
        padding: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .company {
        font-size: 0.8rem;
        opacity: 0.6;
        color: rgba(107 114 128);
        padding-bottom: 2rem;
        margin-bottom: 2rem;
    }
    .date,
    .skill {
        margin-bottom: 1.3rem;
    }
    .summary_type {
        font-size: 1.1rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        flex-direction: row;
        .project_date {
            font-weight: normal;
        }
    }
`;

export const HashtagArea = styled.div`
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--borer-line-color);
    padding-bottom: 1rem;
`;

export const ProjectThumbNail = styled.div<{ $thumbNail: string }>`
    overflow: hidden;
    border-radius: 2rem;
    width: 35%;
    margin-right: 10%;
    margin-bottom: 3rem;
    /* margin-left: 5%; */
    background-position: center center;
    background-size: cover;
    background-image: url(${({ $thumbNail }) => $thumbNail});
    padding-bottom: 30%;
    border: 5px solid rgb(9 17 24 / 6%);
`;

export const ProjectViewFooter = styled.div`
    font-size: 0.8rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--borer-line-color);
    opacity: 0.8;
`;

export const ProjectDescription = styled.div`
    margin-bottom: 20px;
`;
