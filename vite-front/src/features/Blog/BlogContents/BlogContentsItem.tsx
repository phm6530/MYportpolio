import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Fadein from 'FadeinComponent';
import Thumbnail from 'component/ui/Thumbnail';
import SummaryData from 'component/ui/PostTimestamp';
import { BlogMainContentsItemProps } from '@features/Blog/BlogTypes';

const ProjectFadeinStyle = styled(Fadein)`
    /* margin-bottom: 1.5rem; */
    padding-bottom: 2.5rem;
    display: flex;
    flex-direction: row;
    /* flex: 0 0 calc(33.333% - 1.34rem); */
    width: 100%;
    margin-right: 2rem;
    cursor: pointer;
`;

const ProjectDescription = styled.div`
    font-size: 13px;
    /* white-space: pre-line; */
    margin-bottom: 7px;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 표시할 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-description-color);
`;

const ProjectItemHeaderStyle = styled.div`
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: -0.7px;
    align-items: center;
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70%;
`;

const CreateDate = styled(SummaryData)`
    font-size: 12px;
    opacity: 0.7;
`;
const CustomThumNail = styled(Thumbnail)`
    width: 30%;
`;

const BlogContentsItem: React.FC<{ item: BlogMainContentsItemProps }> = ({
    item,
}) => {
    const { post_id, thumnail, post_title, description, date, subcategory } =
        item;
    const navigate = useNavigate();
    return (
        <ProjectFadeinStyle onClick={() => navigate(`${post_id}`)}>
            {/* 썸네일  */}
            <CustomThumNail img={thumnail} badge={subcategory} />
            <ContentsWrap>
                {/* Header */}

                <ProjectItemHeaderStyle>
                    {/* <HasTagCustom>{subcategory}</HasTagCustom> */}
                    {post_title}
                </ProjectItemHeaderStyle>

                {/* Company */}
                <ProjectDescription>{description}</ProjectDescription>
                {/* <HashTag>{subcategory}</HashTag> */}

                <CreateDate date={date} />
            </ContentsWrap>
        </ProjectFadeinStyle>
    );
};

export default BlogContentsItem;
