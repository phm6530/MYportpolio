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
export const ProjectWrapStyle = styled.div`
    flex-direction: column;
    border-radius: 1em;
    background: var(--color-background);
    border: var(--border--btn-type-1);
    flex-grow: 1;
    overflow: hidden;
    padding: 0 2rem;
    display: flex;
    align-items: flex-start;
`;

export const SKill = styled.span<{ $url?: boolean }>`
    display: inline-block;
    color: #555969;
    border-radius: 18px;
    padding: 0.3rem 0.9rem;
    font-size: 14px;
    font-weight: bold;
    margin-right: 0.6rem;
    color: rgb(120 141 170);
    background-color: rgb(235, 244, 255);

    ${props =>
        props.$url &&
        `
            color: #3963a7;
            text-decoration: underline;
            cursor: pointer;        
            display: inline-flex;
            &:hover{
                    color: #0d68fb;
            }
        `}
`;

export const CustumStyle = styled(ProjectWrapStyle)`
    padding: 4rem;
`;

export const ProjectSummary = styled.div`
    margin: 0 1rem;
    margin-bottom: 1rem;
    width: 100%;
    .title {
        font-size: 1.5rem;
        font-weight: bold;
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
        margin-bottom: 2rem;
    }
    .summary_type {
        font-size: 0.9rem;
        font-weight: bold;
        .project_date {
            font-weight: normal;
        }
        .summary_titie {
            display: flex;
            margin-bottom: 0.5rem;
            font-size: 16px;
        }
        span {
            align-items: center;

            svg {
                margin-right: 10px;
                position: relative;
            }
        }

        flex-direction: column;
    }
`;

export const HashtagArea = styled.div`
    margin-bottom: 2rem;
`;

export const ProjectThumbNail = styled.div`
    overflow: hidden;
    border-radius: 2rem;
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
`;

export const ProjectViewFooter = styled.div`
    font-size: 0.8rem;
    margin-bottom: 2rem;
`;
