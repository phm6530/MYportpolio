import styled from 'styled-components';
import * as Yup from 'yup';

import { forwardRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// icon
import { DeleteIcon } from 'component/icon/Icon';
import { FaCircleCheck } from 'react-icons/fa6';
import CommentDelete from '../BoardCommentControl/CommentDelete';
import { useSelector } from 'react-redux';
import Popup from 'component/popup/Popup';
import Confirm from 'component/ui/Confirm';
import useCommentDelete from '../hooks/useCommentDelete';

const HoverStyle = ({ className, children }) => {
    return <span className={className}>{children}</span>;
};

const HoverStyled = styled(HoverStyle)`
    &:hover {
        // 아이콘에 대한 호버 스타일 정의
        svg {
            fill: rgb(97 124 163); // 예: #ff0000
        }
    }
`;

const ReplyPicture = styled.div`
    ${props => `background :url(/img/board/${props.$pirture}.jpg)`};
    background-size: cover;
`;

const ReplyUserName = styled.div`
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

const ReplyWrap = styled.div`
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

const ReplyBubble = styled.div`
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

const BoardComment = forwardRef((props, ref) => {
    const { login } = useSelector(state => state.auth);
    const [modal, setModal] = useState(false);
    const { item, selectIdx, setSelectIdx, lastPageIdx, role } = props;
    const { mutate } = useCommentDelete();

    const {
        user_icon,
        user_name,
        contents,
        date,
        board_key, // 식별 board key
    } = item;

    const schema = Yup.object({
        password: login
            ? Yup.string().notRequired()
            : Yup.string().required('비밀번호를 입력해주세요.'),
    });

    const {
        formState: { errors },
        ...useFormProps
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            password: '',
        },
    });

    const deleteHandler = key => {
        login ? setModal(true) : setSelectIdx(key);
    };

    return (
        <>
            {modal && (
                <Popup closePopup={() => setModal(false)}>
                    <Confirm
                        message={'댓글'}
                        confirm={() => mutate({ board_key })}
                    />
                </Popup>
            )}

            <ReplyWrap key={board_key} ref={ref}>
                <ReplyPicture
                    $pirture={user_icon}
                    className="replyPicture"
                ></ReplyPicture>

                <ReplyBubble $admin={role === 'admin'}>
                    <div className="replyHeader">
                        <ReplyUserName>
                            {user_name}
                            {role === 'admin' && <FaCircleCheck />}
                        </ReplyUserName>
                        {(role === 'admin' && !login) || (
                            <div className="replyDelete">
                                {!selectIdx && (
                                    <button
                                        onClick={() => deleteHandler(board_key)}
                                    >
                                        <HoverStyled>
                                            <DeleteIcon
                                                size="20"
                                                color="#cdcdcd"
                                            />
                                        </HoverStyled>
                                    </button>
                                )}

                                {selectIdx && (
                                    <FormProvider {...useFormProps}>
                                        <CommentDelete
                                            board_key={board_key}
                                            setSelectIdx={setSelectIdx}
                                            mutate={mutate}
                                        />
                                    </FormProvider>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="replyDescription">{contents}</div>
                    <p className="replyDate">{date}</p>
                </ReplyBubble>

                {errors.password && errors.password.message}
            </ReplyWrap>
        </>
    );
});

export default BoardComment;
