import styled, { css } from 'styled-components';

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
    display: inline-block;
    font-weight: bold;
    font-size: 0.9rem;
    min-width: 130px;
    margin-right: 1rem;
`;

export const SummaryWrap = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--borer-line-color);
    padding: 1rem 0;

    margin-bottom: 3rem;
`;

export const SkillWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const SummaryWrapper = styled.div`
    display: flex;
    margin-bottom: 1rem;
    border-right: 1px solid var(--borer-line-color);
    margin-right: 30px;
    padding-right: 30px;
    align-items: center;
`;

export const ProjectTitle = styled.div`
    font-size: 2rem;
    padding: 1rem 0;
    font-weight: bold;
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

export const SKill = styled.span<{ $url?: boolean }>`
    display: inline-block;
    /* color: #555969; */
    border-radius: 18px;
    font-size: 14px;
    margin-right: 13px;
    display: flex;
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

export const ProjectThumbNail = styled.div`
    overflow: hidden;
    border-radius: 2rem;
    width: 50%;
    margin-bottom: 1rem;
`;

export const ProjectViewFooter = styled.div`
    font-size: 0.8rem;
    margin-bottom: 2rem;
    opacity: 0.4;
`;

export const ProjectDescription = styled.div`
    margin-bottom: 20px;
`;

export const ProjectSkillStyle = styled.div<{ $skill: string }>`
    display: inline-block;
    border-radius: 4px;
    padding: 2px 7px;
    margin-right: 5px;

    font-size: 14px;
    background: #2f383d;
    color: #fff;
    /* ${({ $skill }) => {
        switch ($skill) {
            case 'Css':
                return css`
                    background: #3b66cd;
                `;
            case 'JavaScript':
                return css`
                    background: #d3bf1af7;
                `;
            case 'JQuery':
                return css`
                    background: #be5c04;
                `;
            default:
                return 'blue';
        }
    }}; */
`;
