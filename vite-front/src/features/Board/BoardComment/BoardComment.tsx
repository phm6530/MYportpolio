import styled from 'styled-components';
import * as Yup from 'yup';

import { forwardRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'store/appSlice';

// icon
import { DeleteIcon } from 'component/icon/Icon';
import { FaCircleCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import CommentDelete from '@features/Board/BoardCommentControl/CommentDelete';
import useCommentDelete from '@features/Board/hooks/useCommentDelete';

import {
    ReplyWrap,
    ReplyPicture,
    ReplyBubble,
    ReplyUserName,
} from '@features/Board/BoardComment/BoardCommentStyle';

import usePopup from '@hooks/usePopup';

import { type BoardCommentItemProps } from '@type/BoardTypes';
import { userRole } from '@type/CommonTypes';

const HoverStyle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
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

interface BoardCommentProps {
    item: BoardCommentItemProps;
    role: string;
    selectIdx: boolean;
    setSelectIdx: React.Dispatch<React.SetStateAction<string | null>>;
}

const BoardComment = forwardRef<HTMLDivElement, BoardCommentProps>(
    ({ item, role, selectIdx, setSelectIdx }, ref) => {
        const { login } = useSelector((state: RootState) => state.auth);
        const { mutate } = useCommentDelete();
        const { showPopup, PopupComponent } = usePopup();

        const { user_icon, user_name, contents, date, board_key } = item;

        const schema = Yup.object({
            password: login
                ? Yup.string().notRequired()
                : Yup.string().required('비밀번호를 입력해주세요.'),
        });

        const { formState, ...restFormProps } = useForm({
            resolver: yupResolver(schema),
            defaultValues: {
                password: '',
            },
        });

        const deleteHandler = (key: string) => {
            login ? showPopup('댓글') : setSelectIdx(key);
        };

        return (
            <>
                <PopupComponent event={() => mutate(board_key)} />

                <ReplyWrap ref={ref} $admin={role === userRole.Admin}>
                    <ReplyPicture
                        $picture={user_icon}
                        className="replyPicture"
                    />

                    <ReplyBubble $admin={role === userRole.Admin}>
                        <div className="replyHeader">
                            <ReplyUserName>
                                {user_name}{' '}
                                {role === userRole.Admin && <FaCircleCheck />}
                            </ReplyUserName>
                            {(role === userRole.Admin && !login) || (
                                <div className="replyDelete">
                                    {!selectIdx && (
                                        <button
                                            onClick={() =>
                                                deleteHandler(board_key)
                                            }
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
                                        <FormProvider
                                            {...restFormProps}
                                            formState={formState}
                                        >
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

                    {formState.errors.password && (
                        <p>{formState.errors.password.message}</p>
                    )}
                </ReplyWrap>
            </>
        );
    },
);

export default BoardComment;
