import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Wrapper } from 'component/editor/EditorStyle';
import { InputLabel } from 'component/ui/TextArea';

import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import InputErrorMessage from 'component/error/InputErrorMessage';
import { FaRegCalendar } from 'react-icons/fa';

// 데이터피커 스타일
const DatePickerStyle = styled(DatePicker)`
    padding: 5px 10px;
    border-radius: 0.5em;
    background: ${({ theme }) => theme.inputBackground};
    border: 1px solid var(--color-lightBlue);
    /* background: transparent; */
    font-size: 14px;
    cursor: pointer;
    ${props => props.$error && `border: 1px solid var(--color-error);`};
`;

const RageStyle = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 1rem;
`;

const CustumDatePickerStyle = styled.div`
    display: flex;
    flex-direction: column;
`;

const CustumWrapper = styled(Wrapper)`
    flex-direction: row !important;
`;

const PickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormWrap = styled.div`
    position: relative;
    & svg {
        position: absolute;
        pointer-events: none;
        top: 50%;
        right: 0;
        transform: translate(-50%, -50%);
        color: var(--color-lightBlue);
    }
`;

const CustumDatePicker = ({
    label,
    control,
    errors,
    startDateName,
    endDateName,
}) => {
    const [startDate, setStartDate] = useState(false);
    const [endDate, setEndDate] = useState(false);
    // console.log(startDate);
    return (
        <CustumDatePickerStyle>
            <InputLabel>{label}</InputLabel>
            <CustumWrapper>
                <PickerWrapper>
                    <Controller
                        name={startDateName}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormWrap>
                                <DatePickerStyle
                                    $error={errors[startDateName]?.message}
                                    onChange={startDate => {
                                        setStartDate(startDate);
                                        onChange(startDate);
                                    }}
                                    showMonthDropdown={true}
                                    selected={value}
                                    placeholderText="시작일을 입력해주세요."
                                    dateFormat="yyyy-MM-dd"
                                    maxDate={endDate}
                                />
                                <FaRegCalendar />
                            </FormWrap>
                        )}
                    />

                    {errors[startDateName] && (
                        <InputErrorMessage>
                            {errors[startDateName]?.message}
                        </InputErrorMessage>
                    )}
                </PickerWrapper>
                <RageStyle>-</RageStyle>

                <>
                    <PickerWrapper>
                        <Controller
                            name={endDateName}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <FormWrap>
                                    <DatePickerStyle
                                        $error={errors[endDateName]?.message}
                                        onChange={endDay => {
                                            setEndDate(endDay);
                                            onChange(endDay);
                                        }}
                                        selected={value}
                                        placeholderText="종료일을 입력해주세요."
                                        dateFormat="yyyy-MM-dd"
                                        minDate={startDate}
                                    />
                                    <FaRegCalendar />
                                </FormWrap>
                            )}
                        />
                        {errors[endDateName] && (
                            <InputErrorMessage>
                                {errors[endDateName]?.message}
                            </InputErrorMessage>
                        )}
                    </PickerWrapper>
                </>
            </CustumWrapper>
        </CustumDatePickerStyle>
    );
};

export default CustumDatePicker;
