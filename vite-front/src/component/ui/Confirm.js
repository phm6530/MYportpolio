import styled from 'styled-components';
import { Button } from './Button';

const BtnStyle = styled.button``;

const ConfirmStyle = styled.div`
    text-align: center;
    p {
        font-weight: bold;
        font-size: 1rem;
        padding: 20px 0;
        span {
            color: rgba(114, 100, 239, 1);
        }
    }
`;

export default function Confirm({ message, confirm }) {
    return (
        <ConfirmStyle>
            <p>
                [<span>{message}</span>]을/를 삭제하시겠습니까?
            </p>
            <Button.ConfirmButton type={'Confirm'} onClick={confirm}>
                YES
            </Button.ConfirmButton>
        </ConfirmStyle>
    );
}
