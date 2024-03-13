import styled from 'styled-components';
import usePopup from 'hooks/usePopup';

import { useAuthCheck } from 'hooks/useAuthCheck';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import alertThunk from 'store/alertTrunk';

import ScheduleDdaySetter from './ScheduleDdaySetter';

import { fetchEditSchedule, fetchDeleteSchedule, fetchToggleComplete } from 'services/ScheduleService';
import { FormStyle, CompleteHandler, ImportantStyle, TextArea, IsComplete } from './styles/ListHandlerStyled';

const ListHandler = ({ idx, selectWork, setSelectWork, ScheduleItem }) => {
    const { register, handleSubmit, setValue } = useForm();
    const { clientAuthCheck } = useAuthCheck();
    const [textAreaHeight, setTextArerHeight] = useState(ScheduleItem.work.split(/\r\n|\r|\n/).length);
    const { schedule_key, complete, important } = ScheduleItem;
    const { showPopup, hidePopup, PopupComponent } = usePopup();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    // Inline Edit 가능하도록 setValue 설정함
    useEffect(() => {
        setValue('work', ScheduleItem.work);
    }, [ScheduleItem, setValue]);

    // Edit
    const mutation = useMutation(formData => fetchEditSchedule(formData), {
        onSuccess: () => {
            queryClient.invalidateQueries('Schedule');
            dispatch(alertThunk('수정되었습니다.', 1));
            setSelectWork(null);
        },
        onError: error => {
            dispatch(alertThunk(error.message, 0));
        },
    });

    // Delete
    const deleteMutation = useMutation(data => fetchDeleteSchedule(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('Schedule');
            dispatch(alertThunk('삭제되었습니다.', 1));
        },
        onError: error => {
            console.log(error);
            dispatch(alertThunk(error.message, 0));
        },
    });

    // ToggleComplete
    const toggleMutation = useMutation(data => fetchToggleComplete(data), {
        onSuccess: data => {
            queryClient.invalidateQueries('Schedule');
        },
        onError: error => {
            dispatch(alertThunk(error.message, 0));
        },
    });

    const onEditHandler = async data => {
        const requstData = {
            work: data.work,
            schedule_key: ScheduleItem.schedule_key,
        };
        mutation.mutate(requstData);
    };

    const readOnlyHandler = idx => {
        if (!clientAuthCheck('수정')) return;
        setSelectWork(idx);
    };

    const onToggleHandler = key => {
        if (!clientAuthCheck('변경 권한')) return;
        toggleMutation.mutate(key);
    };

    const removeSchedule = () => {
        if (!clientAuthCheck('삭제')) return;
        deleteMutation.mutate(ScheduleItem.schedule_key);
    };

    return (
        <>
            {/* 삭제팝업 */}
            <PopupComponent id="deleteSchedule" event={removeSchedule} />

            <IsComplete $complete={complete}>
                <CompleteHandler onClick={() => onToggleHandler(schedule_key)}>{idx + 1}.</CompleteHandler>
                {important === 1 && (
                    <ImportantStyle>
                        <img src="/img/calendar/important.png" alt=""></img>
                    </ImportantStyle>
                )}
                <FormStyle onSubmit={handleSubmit(onEditHandler)}>
                    <TextArea
                        {...register('work', { required: '빈칸은 입력 불가합니다.' })}
                        rows={textAreaHeight}
                        readOnly={ScheduleItem.schedule_key !== selectWork}
                        onChange={e => {
                            setTextArerHeight(e.target.value.split(/\r\n|\r|\n/).length);
                            console.log(e.target.value.length);
                        }}
                    />

                    {ScheduleItem.schedule_key === selectWork && <button type="submit">확인</button>}
                </FormStyle>

                {/* 수정 */}
                <button onClick={() => readOnlyHandler(ScheduleItem.schedule_key)}>
                    <MdModeEdit size={'17'} />
                </button>

                {/* 삭제 */}
                <button onClick={() => showPopup('deleteSchedule')}>
                    <FaTrashAlt size={'13'} />
                </button>
            </IsComplete>
        </>
    );
};

export default ListHandler;
