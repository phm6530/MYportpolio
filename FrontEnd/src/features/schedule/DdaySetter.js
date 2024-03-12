import DdayHandler from './component/DdayHandler';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from 'component/ui/Button';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { InputStyle } from 'component/ui/TextArea';
import { useMutation, useQueryClient } from 'react-query';
import { fetchAddSchedule } from 'page/todo/ScheduleFetch';
import alertThunk from 'store/alertTrunk';
import { useDispatch } from 'react-redux';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { useRef } from 'react';

const DdaySetterStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DdaySetter = () => {
    const dispatch = useDispatch();
    const { clientAuthCheck } = useAuthCheck();
    const childRef = useRef();

    const {
        formState: { errors },
        reset,
        register,
        watch,
        ...formMethods
    } = useForm({
        defaultValues: {
            schedule_date: '',
            schedule_key: '',
            work: '',
            important: 2,
        },
    });

    const submitHandler = async data => {
        const formData = {
            schedule_date: data.schedule_date,
            schedule_key: uuidv4(),
            work: data.work,
            important: 2,
        };
        if (!clientAuthCheck('D-day 설정')) return;
        // console.log(formData);
        mutate(formData);
    };

    const queryClient = useQueryClient();
    // console.log(queryClient);

    const { mutate } = useMutation(data => fetchAddSchedule(data), {
        onSuccess: data => {
            // console.log(data);
            queryClient.invalidateQueries('Schedule');
            dispatch(alertThunk('D-Day 등록하였습니다.', 1));
            reset();
            childRef.current.reset(); // 하위 Date  상태 초기화
        },
        onError: error => {
            dispatch(alertThunk(error.message, 0));
        },
    });

    const errorArr = Object.values(errors).map(e => e.message);
    return (
        <>
            <DdaySetterStyle>
                <FormProvider {...formMethods}>
                    <DdayHandler ref={childRef} />
                    <InputStyle
                        $error={errors.work}
                        placeholder="일정을 기재해주세요"
                        type="text"
                        {...register('work', { required: 'D-day를 기재해주세요' })}
                    />
                    <Button.Submit onClick={formMethods.handleSubmit(submitHandler)}>D-day 등록하기</Button.Submit>
                </FormProvider>
                {errorArr && errorArr[0]}
            </DdaySetterStyle>
        </>
    );
};

export default DdaySetter;
