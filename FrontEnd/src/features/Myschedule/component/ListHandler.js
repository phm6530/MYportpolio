import usePopup from 'hooks/usePopup';

import { useAuthCheck } from 'hooks/useAuthCheck';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCancel } from 'component/icon/Icon';

import { Checkbox, Button as Btn, useTheme } from '@mui/material';

import { MdModeEdit } from 'react-icons/md';

import {
    fetchEditSchedule,
    fetchDeleteSchedule,
    fetchToggleComplete,
} from 'services/ScheduleService';

import {
    FormStyle,
    ImportantStyle,
    TextArea,
    IsComplete,
} from './styles/ListHandlerStyled';
import { FlexColumnDiv } from 'features/CommonStyles';
import Category from '../ui/Category';
import useExcuteMutation from 'hooks/useExcuteMutation';
import styled from 'styled-components';

const Button = styled.button`
    svg {
        cursor: pointer;
        opacity: 0.4;
        color: #8f9db8;
        &:hover {
            color: #384867;
        }
    }
`;

const FullFlexColumnDiv = styled(FlexColumnDiv)`
    flex-grow: 1;
`;

const ListHandler = ({ selectWork, setSelectWork, ScheduleItem }) => {
    const { register, handleSubmit, setValue } = useForm();
    const { clientAuthCheck } = useAuthCheck();
    const [prevWork, setPrevWork] = useState(ScheduleItem.work);
    const theme = useTheme();

    // 이전 댓글과 비교하여 재 패칭 방지
    useEffect(() => {
        setPrevWork(ScheduleItem.work);
    }, [ScheduleItem]);

    const [textAreaHeight, setTextArerHeight] = useState(
        ScheduleItem.work.split(/\r\n|\r|\n/).length,
    );
    const { schedule_key, complete, important } = ScheduleItem;
    // console.log(important);
    const { showPopup, hidePopup, PopupComponent } = usePopup();

    const { mutate: EditMutate } = useExcuteMutation(
        fetchEditSchedule,
        ['Schedule'],
        '수정',
    );

    const { mutate: deleteMutate } = useExcuteMutation(
        fetchDeleteSchedule,
        ['Schedule'],
        '삭제',
    );

    const { mutate: toggleMutate } = useExcuteMutation(fetchToggleComplete, [
        'Schedule',
    ]);

    // Inline Edit 가능하도록 setValue 설정함
    useEffect(() => {
        setValue('work', ScheduleItem.work);
    }, [ScheduleItem, setValue]);

    const onEditHandler = async data => {
        console.log('data::::', data);
        const requstData = {
            work: data.work,
            schedule_key: ScheduleItem.schedule_key,
        };
        if (prevWork === data.work) {
            console.log('동일함');
        } else {
            EditMutate(requstData);
        }
        setSelectWork(null);
    };

    const readOnlyHandler = idx => {
        if (!clientAuthCheck('수정')) return;
        setSelectWork(idx);
    };

    const onToggleHandler = key => {
        if (!clientAuthCheck('변경 권한')) return;
        toggleMutate(key);
    };

    const removeSchedule = () => {
        if (!clientAuthCheck('삭제')) return;
        deleteMutate(ScheduleItem.schedule_key);
        hidePopup();
    };
    // console.log(selectWork);

    console.log('complete', complete);
    return (
        <>
            {/* 삭제팝업 */}
            <PopupComponent event={removeSchedule} />

            <IsComplete $Dday={important === 2} $complete={complete}>
                <Checkbox
                    sx={{
                        padding: 0,
                        mr: 1,
                        color: theme.palette.primary.main,
                    }}
                    onChange={() => onToggleHandler(schedule_key)}
                    checked={complete === 1}
                />

                {important === 2 && (
                    <ImportantStyle>
                        <img src="/img/calendar/dday.png" alt=""></img>
                    </ImportantStyle>
                )}
                {important === 1 && (
                    <ImportantStyle>
                        <img src="/img/calendar/important.png" alt=""></img>
                    </ImportantStyle>
                )}

                <FormStyle onSubmit={handleSubmit(onEditHandler)}>
                    <FullFlexColumnDiv>
                        <TextArea
                            {...register('work', {
                                required: '빈칸은 입력 불가합니다.',
                            })}
                            rows={textAreaHeight}
                            readOnly={ScheduleItem.schedule_key !== selectWork}
                            onChange={e => {
                                setTextArerHeight(
                                    e.target.value.split(/\r\n|\r|\n/).length,
                                );
                                // console.log(e.target.value.length);
                            }}
                        />
                        <Category>{ScheduleItem.category}</Category>
                    </FullFlexColumnDiv>
                    {ScheduleItem.schedule_key === selectWork && (
                        <Btn type="submit">확인</Btn>
                    )}
                </FormStyle>

                {/* 수정 */}
                <Button
                    onClick={() => readOnlyHandler(ScheduleItem.schedule_key)}
                >
                    <MdModeEdit size={'17'} />
                </Button>

                {/* 삭제 */}
                <Button onClick={() => showPopup('일정')}>
                    <MdCancel />
                </Button>
            </IsComplete>
        </>
    );
};

export default ListHandler;
