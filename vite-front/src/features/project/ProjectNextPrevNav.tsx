import useFetchNextPrevList from '@features/project/hooks/useFetchNextPrevList';
import Thumbnail from 'component/ui/Thumbnail';
import { ENDPOINT_URL } from 'constants/apiUrl';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PrevnextNav = styled.div`
    cursor: pointer;
    margin-bottom: 1rem;
`;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
    img {
        width: 15%;
        border-radius: 10px;
    }
`;

const PrevnextTitle = styled.div`
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
`;

const PrevnextSummary = styled.div`
    margin-left: 1rem;
`;

const PrevnextSummaryWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
`;

const ThumbNailStyle = styled(Thumbnail)`
    width: 15%;
    height: 100px;
    margin-right: 1.5rem;
`;

const PrevnextDescription = styled.div`
    opacity: 0.5;
`;

const ProjectNextPrevNav = () => {
    const { data: list } = useFetchNextPrevList();
    const navigate = useNavigate();

    console.log(list);

    return (
        <>
            {list &&
                list.map((item, key) => {
                    const isPage =
                        item.isPage === 'prev' ? '이전 글' : '다음 글';

                    return (
                        <Wrap key={key}>
                            <PrevnextNav>{isPage}</PrevnextNav>
                            <PrevnextSummaryWrapper
                                onClick={() =>
                                    navigate(`/project/${item.project_key}`)
                                }
                            >
                                <ThumbNailStyle
                                    img={`${ENDPOINT_URL}/${item.thumbnail}`}
                                />

                                <PrevnextSummary>
                                    <PrevnextTitle>{item.title}</PrevnextTitle>
                                    <PrevnextDescription>
                                        {item.description}
                                    </PrevnextDescription>
                                </PrevnextSummary>
                            </PrevnextSummaryWrapper>
                        </Wrap>
                    );
                })}
            {/* <pre>{JSON.stringify(list, null, 4)}</pre>; */}
        </>
    );
};

export default ProjectNextPrevNav;
