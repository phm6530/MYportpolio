import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const UserIconViewer = styled.div`
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 1rem;
    button {
        background: rgba(0, 0, 0, 0.1);
        font-size: 12px;
        padding: 3px 17px;
        margin-top: 10px;
        border-radius: 3em;
    }
    .ImgArea {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        overflow: hidden;
        border: 7px solid var(--borer-line-picture-color);
        box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.2);
        img {
            width: 100%;
        }
    }
`;

const CrectorView = ({ watch }) => {
    const selectIcon = `/img/board/${watch('userIcon')}.jpg`;
    return (
        <UserIconViewer>
            <div className="ImgArea">
                <img src={selectIcon} alt="Pictureasa" />
            </div>
            {/* {login || (
                <button onClick={() => setChangeCrector(true)}>You</button>
            )} */}
        </UserIconViewer>
    );
};

export default CrectorView;
