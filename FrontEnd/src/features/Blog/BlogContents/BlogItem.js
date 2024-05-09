import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Fadein from 'FadeinComponent';
import Thumbnail from 'component/ui/Thumbnail';

const ProjectFadeinStyle = styled(Fadein)`
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 0 0 calc(33.333% - 1.34rem);
    margin-right: 2rem;
    cursor: pointer;

    &:nth-child(3n) {
        margin-right: 0rem;
    }
`;

const ProjectDescription = styled.div`
    font-size: 13px;
    /* white-space: pre-line; */
    margin-bottom: 7px;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 표시할 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-description-color);
`;

const ProjectItemHeaderStyle = styled.div`
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: -0.7px;
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
`;

const CreateDate = styled.div`
    margin-top: 0.5rem;
    font-size: 12px;
    opacity: 0.5;
    font-weight: b;
`;

const BlogItem = ({ item }) => {
    const { post_id, thumnail, post_title, description, date } = item;
    const navigate = useNavigate();

    return (
        <ProjectFadeinStyle onClick={() => navigate(`${post_id}`)}>
            {/* 썸네일  */}
            <Thumbnail img={thumnail} />
            <ContentsWrap>
                {/* Header */}

                <ProjectItemHeaderStyle>{post_title}</ProjectItemHeaderStyle>

                {/* Company */}
                <ProjectDescription>{description}</ProjectDescription>
                {/* <div className="hashTag">{hashTag}</div> */}
                <CreateDate>{date}</CreateDate>

                {/* <div>
                    {hashtag &&
                        hashtag.map((e, idx) => (
                            <HashtageStyle
                                className="hashTag"
                                key={`hash-${idx}`}
                            >
                                # {e}
                            </HashtageStyle>
                        ))}
                </div> */}
            </ContentsWrap>
        </ProjectFadeinStyle>
    );
};

export default BlogItem;
