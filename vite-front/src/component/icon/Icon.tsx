//login Icon
// import { IoPersonCircleSharp } from 'react-icons/io5';
// import { RiLockPasswordFill } from 'react-icons/ri';
// import { TiDelete } from 'react-icons/ti';
// import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
// import { RxQuestionMarkCircled } from 'react-icons/rx';
import { MdCancel } from 'react-icons/md';

import styled from 'styled-components';

const IconStyle = styled.div`
    display: inline-block;
    margin-right: 10px;
    img {
        width: 20px;
    }
`;

interface IconProps {
    src: string;
    alt: string;
}

const Icon: React.FC<IconProps> = ({ src, alt }) => {
    return (
        <IconStyle>
            <img src={src} alt={alt} />
        </IconStyle>
    );
};

export default Icon;
export { MdCancel };
