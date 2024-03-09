import styled, { keyframes, css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Confirm from 'component/ui/Confirm';
import Popup from 'component/popup/Popup';

// icon
import { FaLink } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import useProjectActions from 'hooks/useProjectActions';

const showAni = keyframes`
    from{
        opacity: 0;
        transform: scale(0);
    }
    to{
        opacity: 1;
        transform: scale(1);
    }
`;

// component
const ProjectEditWrap = styled.div`
    position: relative;
    margin-left: auto;
    ${props =>
        props.$view &&
        css`
            animation: ${showAni} 0.3s ease;
        `}
    button {
        padding: 7px;

        svg {
            font-size: 14px;
            color: rgb(16 33 76 / 70%);
        }
        &:first-child {
            right: -50px;
        }
        &:nth-child(2) {
            left: -60px;
        }
    }
`;

const ProjectTitle = styled.div`
    font-weight: 600;
    font-size: 1.2rem;
    display: flex;
    letter-spacing: -0.7px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: #212224;
    margin-bottom: 1.3rem;
    color: transparent;
    background-clip: text;
    button {
        background: rgba(0, 0, 0, 0.1);
        padding: 7px;
        border-radius: 100%;
    }
`;

const IconCustum = styled(HiOutlineDotsVertical)`
    cursor: pointer;
    ${props => props.$view && 'opacity: 0'}
`;

const ProjectItemHeaderStyle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const EditArea = styled.div`
    position: absolute;
    display: flex;
    right: 0;
    top: 50%;
    transform: translate(-0%, -50%);
    z-index: 10;
`;

export default function ProjectItemHeader({ activeIdx, setActiveIdx, project }) {
    const [area, setArea] = useState(activeIdx);
    const { modal, setModal, mutateAsync, updateHandler, deleteHandler } = useProjectActions();
    const ref = useRef();

    useEffect(() => {
        const outSideClickhandler = e => {
            if (!ref.current.contains(e.target)) {
                setActiveIdx(null);
                setArea(false);
                return;
            }
            setArea(true);
        };

        document.addEventListener('mousedown', outSideClickhandler);
        return () => {
            document.removeEventListener('mousedown', outSideClickhandler);
        };
    }, []);

    return (
        <>
            {modal && (
                <Popup closePopup={() => setModal(false)}>
                    <Confirm
                        message={'프로젝트'}
                        confirm={() => {
                            mutateAsync(project.project_key);
                        }}
                    />
                </Popup>
            )}

            <ProjectItemHeaderStyle>
                <ProjectTitle>
                    {project.title}
                    <FaLink size={'14'} style={{ marginRight: 'auto', marginLeft: '10px' }} />
                </ProjectTitle>

                <ProjectEditWrap ref={ref} $view={area}>
                    <IconCustum
                        $view={area}
                        onClick={e => {
                            e.stopPropagation();
                            setActiveIdx(project.id);
                        }}
                    />
                    {area && (
                        <EditArea>
                            <button onClick={() => updateHandler(project.project_key)}>
                                <MdModeEdit />
                            </button>
                            <button onClick={() => deleteHandler(project.project_key)}>
                                <FaTrashAlt />
                            </button>
                        </EditArea>
                    )}
                </ProjectEditWrap>
            </ProjectItemHeaderStyle>
        </>
    );
}
