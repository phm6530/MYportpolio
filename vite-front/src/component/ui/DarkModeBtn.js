import styled, { keyframes } from 'styled-components';
import { LuSunDim } from 'react-icons/lu';
import { IoMoon } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { darkModeActions } from 'store/appSlice';
import { useEffect } from 'react';

const DarkmodeButton = styled.div`
    border-radius: 1em;
    background: transparent;
    border: 0;
    background: transparent;
    color: #fff;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 3px 6px;
    cursor: pointer;
    overflow: hidden;
    width: 60px;
    height: 30px;
    border: 2px solid #ffffff2b;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    &:active {
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.8);
    }

    ${props =>
        props.$darkMode &&
        `
        background:#fff;
        color:#000; 
        box-shadow: 0px 5px 15px rgb(255 255 255 / 15%);
    `}
`;
const IconAnimation = keyframes`
    from{
        opacity: 0;
        transform: scale(.5);
    }
    to{
        opacity: 1;
        transform: scale(1);
    }
`;

const DarkModeIcon = styled.div`
    width: 24px;
    height: 24px;
    background: red;
    position: absolute;
    left: 3px;
    display: flex;
    justify-content: center;
    border-radius: 5em;
    transition: all 0.3s ease;
    align-items: center;
    svg {
        animation: ${IconAnimation} 0.3s ease;
    }

    ${props =>
        props.$darkMode
            ? ` left:calc(100% - 27px);  background: #5b5b5b;`
            : `background: #ffffff4a; color: #fff;`}
`;

export default function DarkModeBtn() {
    const { darkMode } = useSelector(state => state.darkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const modeHandler = () => {
        dispatch(darkModeActions.toggleMode());
    };

    return (
        <DarkmodeButton onClick={() => modeHandler()}>
            <DarkModeIcon $darkMode={darkMode}>
                {darkMode ? <LuSunDim size={'20'} /> : <IoMoon size={'15'} />}
            </DarkModeIcon>
        </DarkmodeButton>
    );
}
