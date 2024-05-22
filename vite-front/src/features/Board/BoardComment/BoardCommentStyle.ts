import styled from 'styled-components';

export const ReplyPicture = styled.div<{ $picture: string }>`
    ${props => `background :url(/img/board/${props.$picture}.jpg)`};
    background-size: cover;
`;

export const ReplyUserName = styled.div`
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 14px;
    svg {
        font-size: 12px;
        margin-left: 0.4rem;
        color: #40a3a8;
    }
`;

export const ReplyWrap = styled.div`
    margin-bottom: 3px;
    /* border-radius: 1em; */

    margin: 0 1rem;
    border-radius: 1em;
    margin-bottom: 10px;
    padding: 0 10px;
    display: flex;
    position: relative;

    .replyPicture {
        width: 45px;
        height: 45px;
        margin-right: 20px;
        border-radius: 5em;

        border: 3px solid var(--borer-line-picture-color);
        box-sizing: border-box;
        box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.3);
    }
    .replyHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .replyDate {
        font-size: 13px;
        opacity: 0.7;
    }
    .replyDescription {
        margin-bottom: 10px;
        margin-top: 5px;
        font-size: 14px;
        word-break: break-all;
        white-space: pre-line;
    }
`;

export const ReplyBubble = styled.div<{ $admin: boolean }>`
    background-color: ${({ theme }) => theme.SearchBackground};
    padding: 10px 15px;
    border-radius: 0.5em;
    position: relative;
    /* width: calc(100% - 70px); */
    /* Rectangle 869 */
    background: #3d3d3d;
    min-width: 40%;
    background: linear-gradient(180deg, #323a59 0%, #556976 100%);
    background: linear-gradient(180deg, #3d3a56 0%, #5a5576 100%);
    /* background: ${({ $admin }) => ($admin ? '#FFEB33' : '#fff')}; */
    box-shadow: 2px 2px 3px rgb(0 0 0 / 15%);
    border: 1px solid rgb(0 0 0 / 8%);
    border: 2px solid #4c466b;

    &::before {
        content: '';
        display: block;
        position: absolute;
        left: -20px;
        top: 15px;
        width: 0;
        height: 0;
        border-bottom: 5px solid transparent;
        border-top: 5px solid transparent;
        border-left: 10px solid #433f5c;
        border-right: 10px solid transparent;
        transform: rotate(180deg);
    }
`;
