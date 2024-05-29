//login Icon
import { IoPersonCircleSharp } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { MdCancel } from 'react-icons/md';

// icon
import { BsFillMoonFill } from 'react-icons/bs';

const LoginUser = ({ size, color }) => {
    return <IoPersonCircleSharp size={size || 10} color={color || 'black'} />;
};

const LoginPassword = ({ size, color }) => {
    return <RiLockPasswordFill size={size || 10} color={color || 'black'} />;
};

const Moon = ({ size, color }) => {
    return <BsFillMoonFill size={size} />;
};

const Sun = ({ size, color }) => {
    return <BsFillMoonFill size={size} />;
};

// BoardIcon
const DeleteIcon = ({ size, color }) => {
    return <TiDelete size={size} color={color || 'black'} />;
};
const SpeechBubble = ({ size, color }) => {
    return <IoChatbubbleEllipsesOutline size={size} color={color || 'black'} />;
};
const QuestionMark = ({ size, color }) => {
    return <RxQuestionMarkCircled size={size} color={color || 'black'} />;
};

export {
    // Login
    LoginUser,
    LoginPassword,

    // moon
    Moon,
    Sun,

    // Board
    DeleteIcon,
    QuestionMark,
    SpeechBubble,
    MdCancel,
};