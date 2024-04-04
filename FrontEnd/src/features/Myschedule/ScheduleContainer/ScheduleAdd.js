import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { ReactHookForm, ReactRedux, ReactQuery } from 'lib/lib';
import alertThunk from 'store/alertTrunk';

import { fetchAddSchedule } from 'services/ScheduleService';
import { TextAreaStyle } from '../../../component/ui/TextArea';
import { Button } from '../../../component/ui/Button';
import ErrorBubble from 'component/error/ErrorBubble';
import HookformRadio from '../component/HookformRadio';

import { SCHEDULE_CATEGORY } from 'utils/constans';

// lib
const { useForm, Controller } = ReactHookForm;
const { useDispatch } = ReactRedux;
const { useQueryClient, useMutation } = ReactQuery;

const AddScheduleFormStyle = styled.form`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    textarea {
        width: 100%;
        font-size: 14px;
    }
`;
const TextAreaWrap = styled.div`
    width: 100%;
`;

const ScheduleAdd = ({ selectDay }) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Schedule_title: '',
            Schedule_important: false,
            TaskCategory: null,
        },
    });
    // console.log('errors : ',errors);
    const { clientAuthCheck } = useAuthCheck();
    const dispatch = useDispatch();

    const queryclient = useQueryClient();

    const mutation = useMutation({
        mutationFn: data => fetchAddSchedule(data),
        onSuccess: () => {
            dispatch(alertThunk('일정이 등록 되었습니다.', 1));
            queryclient.invalidateQueries({ queryKey: ['Schedule'] });
            reset();
        },
    });

    // console.log(mutation.data);

    // useEffect(() => {
    //     if (mutation.isError) {
    //         dispatch(alertThunk(mutation.error.message, false));
    //     }
    //     if (mutation.isSuccess) {
    //     }

    //     // console.log(error);
    // }, [mutation.isError, mutation.isSuccess, mutation.data]);

    const AddScheduleHandler = async formData => {
        const requestData = {
            schedule_date: selectDay,
            work: formData.Schedule_title,
            important: formData.Schedule_important,
            category: formData.TaskCategory,
            schedule_key: uuidv4(),
        };

        console.log(requestData);

        if (!clientAuthCheck('입력')) return;
        mutation.mutate(requestData);
    };

    // console.log(errors);
    return (
        <>
            <AddScheduleFormStyle onSubmit={handleSubmit(AddScheduleHandler)}>
                <label>
                    <input
                        {...register('Schedule_important')}
                        type="checkbox"
                    />
                    중요!
                </label>

                {/* {errors.Schedule_title && (
                        <ErrorBubble>
                            {errors.Schedule_title.message}
                        </ErrorBubble>
                )} */}
                <HookformRadio
                    Radio={SCHEDULE_CATEGORY}
                    control={control}
                    errors={errors}
                    keyName={'TaskCategory'}
                />

                <TextAreaWrap>
                    {errors.Schedule_title && (
                        <ErrorBubble>
                            {errors.Schedule_title.message}
                        </ErrorBubble>
                    )}
                    <TextAreaStyle
                        $error={errors.Schedule_title}
                        placeholder="일정을 입력해주세요"
                        {...register('Schedule_title', {
                            required: '추가하실 일정을 입력해주세요!',
                            maxLength: {
                                value: 250,
                                message:
                                    '250자를 초과해서 등록 할 수 없습니다.',
                            },
                        })}
                    />
                </TextAreaWrap>
                <Button.Submit>입력하기</Button.Submit>
            </AddScheduleFormStyle>
            {/* {errors.Schedule_Category && <ErrorStyle>{errors.Schedule_Category.message}</ErrorStyle>} */}
        </>
    );
};

export default ScheduleAdd;
