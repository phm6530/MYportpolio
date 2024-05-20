import styled from 'styled-components';
const { useLocation } = ReactRouteDom;

import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { findForBadword, scriptReplace } from 'utils/wordingFilters';
import BoardCommentInput from './BoardCommentInput';

import { Button } from 'component/ui/Button';
import { ReactRouteDom } from 'lib/lib';
import { yupResolver } from '@hookform/resolvers/yup'; // Yup + form hook 연동
import { useForm } from 'react-hook-form';

import useCommentAdd from '../hooks/useCommentAdd';
import BoardCrector from '../BoardCrector';
import CrectorView from '../BoardCrector/CrectorView';
import { randomCrector } from '../BoardUtils/randomCrector';
import { useEffect } from 'react';
import { yupSchema } from '../BoardUtils/YupSchema';

const BoardReplyStyle = styled.div`
    border-radius: 1em 1em 0 0;
    display: flex;
    position: relative;
    .InputWrap {
        flex-grow: 1;
        width: 100%;
    }
`;

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex-grow: 1;
    align-items: flex-start;
    background-clip: text;
`;

export default function BoardCommentForm() {
    const { login } = useSelector(state => state.authSlice);

    // Comment Add Hook
    const { mutate: addMutate } = useCommentAdd();
    const location = useLocation();

    // 유효성검사
    const schema = yupSchema(login);

    // React-hook-form
    const {
        reset,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            userIcon: '',
            userName: login ? 'Admin' : '',
            contents: '',
            password: '',
        },
    });

    useEffect(() => {
        const currentValues = getValues();
        reset({
            ...currentValues,
            userName: login ? 'Admin' : '',
            userIcon: randomCrector(login),
        });
    }, [login, reset, getValues]);

    // submit
    const onSubmitHandlr = async ({ contents, userName, ...data }) => {
        // 욕설 필터링
        if (!findForBadword(contents)) return;

        const formData = {
            idx: uuidv4(),
            contents: scriptReplace(contents),
            userName: scriptReplace(userName),
            ...data,
            page: new URLSearchParams(location.search).get('page') || 1,
        };

        // 요청
        addMutate(formData);

        reset({
            ...getValues(),
            userName: login ? 'Admin' : '',
            contents: '',
            password: '',
        });
    };

    return (
        <BoardReplyStyle>
            {/* 캐릭터 뷰 */}
            <CrectorView watch={watch} />
            <FormStyle method="POST" onSubmit={handleSubmit(onSubmitHandlr)}>
                {/* 캐릭터 영역 */}
                {!login && (
                    <Controller
                        name="userIcon"
                        control={control}
                        render={({ field }) => (
                            <BoardCrector
                                getValues={getValues}
                                reset={reset}
                                {...field}
                            />
                        )}
                    />
                )}

                <div className="InputWrap">
                    <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => (
                            <BoardCommentInput
                                {...field}
                                label="글쓴이"
                                isAuth={login}
                                placeholder={'이름을 입력해주세요.'}
                                type={'text'}
                                error={errors[{ ...field }.name]}
                            />
                        )}
                    />
                    {!login && (
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <BoardCommentInput
                                    {...field}
                                    label="password"
                                    type={'password'}
                                    placeholder={
                                        '4자 이상의 비밀번호를 입력해주세요.'
                                    }
                                    error={errors[{ ...field }.name]}
                                />
                            )}
                        />
                    )}
                    <Controller
                        name="contents"
                        control={control}
                        render={({ field }) => (
                            <BoardCommentInput
                                {...field}
                                label="댓글"
                                type={'textarea'}
                                placeholder={'남기실 댓글 내용을 입력해주세요!'}
                                error={errors[{ ...field }.name]}
                            />
                        )}
                    />
                    <Button.Submit style={{ marginLeft: 'auto' }}>
                        Submit
                    </Button.Submit>
                </div>
            </FormStyle>
        </BoardReplyStyle>
    );
}
