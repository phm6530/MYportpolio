import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Wrapper } from 'component/editor/EditorStyle';
import { InputLabel } from 'component/ui/TextArea';
import InputErrorMessage from 'component/error/InputErrorMessage';

// 데이터피커 스타일
const DatePickerStyle = styled(DatePicker)`
    padding: 5px 10px;
    border-radius: 0.5em;
    background: ${({ theme }) => theme.input_background};
    font-size: 14px;
    border: 1px solid #00000014;
    ${props => props.$error && `border: 1px solid var(--error-color);`}
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
                <Wrapper>
                    <Controller
                        name={startDateName}
                        control={control}
                        render={({ field: { onChange, value } }) => (
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
                        )}
                    />

                    {errors[startDateName] && (
                        <InputErrorMessage>
                            {errors[startDateName]?.message}
                        </InputErrorMessage>
                    )}
                </Wrapper>
                <RageStyle>-</RageStyle>

                <>
                    <Wrapper>
                        <Controller
                            name={endDateName}
                            control={control}
                            render={({ field: { onChange, value } }) => (
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
                            )}
                        />
                        {errors[endDateName] && (
                            <InputErrorMessage>
                                {errors[endDateName]?.message}
                            </InputErrorMessage>
                        )}
                    </Wrapper>
                </>
            </CustumWrapper>
        </CustumDatePickerStyle>
    );
};

export default CustumDatePicker;
