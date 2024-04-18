import styled from 'styled-components';

const CurruntReplyState = styled.div`
    display: flex;
    margin-bottom: 1rem;
    .currentReply {
        font-size: 0.8rem;
        font-weight: bold;
        margin-right: 10px;
        background: #e6e6e6;
        color: #fff;
        background: linear-gradient(to left, #a35d5d, #6a5f86, #5262a8);
        color: transparent;
        background-clip: text;
        position: relative;
        margin-right: 2rem;
        span {
            margin-left: 0.5rem;
            border-radius: 2em;
            display: inline-block;
            text-align: center;
        }
    }
`;

export default function CommentState({ todayReply, total }) {
    return (
        <CurruntReplyState>
            <div className="currentReply">
                오늘 작성된 댓글 <span>{todayReply}</span>
            </div>
            <div className="currentReply">
                전체 댓글 <span>{total}</span>
            </div>
        </CurruntReplyState>
    );
}
