import useFetchNextPrevList from '@features/project/hooks/useFetchNextPrevList';
import { ENDPOINT_URL } from 'constants/apiUrl';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PrevnextNav = styled.div`
    cursor: pointer;
`;

const ProjectNextPrevNav = () => {
    const { data: list } = useFetchNextPrevList();
    const navigate = useNavigate();

    return (
        <>
            {list &&
                list.map(item => {
                    const isPage =
                        item.isPage === 'prev' ? '이전 글' : '다음 글';

                    return (
                        <>
                            <PrevnextNav
                                onClick={() =>
                                    navigate(`/project/${item.project_key}`)
                                }
                            >
                                {isPage}
                            </PrevnextNav>
                            <img
                                src={`${ENDPOINT_URL}/${item.thumbnail}`}
                                alt={item.description}
                            />
                            {item.description}
                        </>
                    );
                })}
            <pre>{JSON.stringify(list, null, 4)}</pre>;
        </>
    );
};

export default ProjectNextPrevNav;
