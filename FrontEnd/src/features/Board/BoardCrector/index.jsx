import { QuestionMark } from '@mui/icons-material';
import { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';

const checkAnimtaion = keyframes`
from{
    opacity: 0;
    transform: scale(.5);
}
to{
    opacity: 1;
    transform: scale(1);
}
`;

const RadioStyle = styled.label`
    position: relative;
    box-sizing: border-box;
    transition: transform 0.2s ease;
    input {
        display: none;
    }
    &:hover {
        transform: scale(1.1);
    }
    img {
        border-radius: 7em;
    }
    border: 7px solid transparent;

    &.checked {
        border: 7px solid #fff;
        border-radius: 7em;
        img {
            filter: none;
        }
        &::after {
            position: absolute;
            content: '';
            width: 17px;
            height: 17px;
            border-radius: 2em;
            top: -7px;
            background: #994ed2;
            border: 2px solid #fff;
            animation: ${checkAnimtaion} 0.5s ease;
        }
    }
    img {
        width: 50px;
        cursor: pointer;
        filter: grayscale(1);
    }
`;
const RadioWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 10px 20px; */
    border-radius: 1em;
    margin-bottom: 19px;
    z-index: 1;
    left: 0;
    top: -4em;
    border: 3px solid #ffffff4f;
    box-sizing: border-box;
`;

const Label = styled.span`
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 10px;
    span {
        position: relative;
        svg {
            margin-left: 5px;
            cursor: pointer;
        }
        &::after {
            content: '댓글에 입력될 캐릭터에요';
            position: absolute;
            display: none;
            background: #fff;
            font-size: 12px;
            width: 140px;
            top: -30px;
            left: 20px;
            border-radius: 13px;
            padding: 5px;
            text-align: center;
        }
        &::before {
            position: absolute;
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            bottom: 18px;
            z-index: 0;
            left: 24px;
            background: #fff;
            transform: rotate(60deg);
            display: none;
        }

        &:hover::after,
        &:hover::before {
            display: block;
        }
    }
`;

const BoardCrector = forwardRef(({ ...field }, ref) => {
    const { value } = field;
    return (
        <>
            <Label>
                Crecter{' '}
                <span>
                    <QuestionMark color={'#0000005e'} size={'20'} />
                </span>
            </Label>
            <RadioWrap>
                {[...Array(6)].map((_, idx) => {
                    const icon = `person_${idx + 1}`;

                    return (
                        <RadioStyle
                            key={icon}
                            className={icon === value ? 'checked' : undefined}
                        >
                            <img src={`/img/board/${icon}.png`} alt="" />
                            <input
                                type="radio"
                                value={icon}
                                onChange={() => {
                                    field.onChange(icon);
                                }}
                                name={field.name}
                                checked={field.value === icon}
                            />
                        </RadioStyle>
                    );
                })}
            </RadioWrap>
        </>
    );
});

export default BoardCrector;
