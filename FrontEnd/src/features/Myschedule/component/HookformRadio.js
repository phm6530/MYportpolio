import styled from 'styled-components';
import ErrorBubble from 'component/error/ErrorBubble';
import { Controller } from 'react-hook-form';

const RadioWrap = styled.div`
    position: relative;
    display: flex;
    margin-right: auto;

    label {
        font-size: 14px;
        margin-right: 1.4rem;
        display: flex;
        cursor: pointer;
        &:hover {
            text-shadow: 0 0 0;
        }
        input {
            margin-right: 5px;

            &:checked {
                color: red;
            }
        }
    }
`;

const HookformRadio = ({ Radio, control, errors, keyName }) => {
    // console.log(errors);
    return (
        <RadioWrap>
            {errors[keyName] && (
                <ErrorBubble>{errors[keyName].message}</ErrorBubble>
            )}
            <Controller
                control={control}
                name={keyName}
                rules={{ required: '필수항목입니다.' }}
                render={({ field }) => {
                    return Radio.map(e => {
                        // console.log(field);
                        // console.log(e);
                        return (
                            <label key={`key-${e}`}>
                                <input
                                    type="radio"
                                    {...field}
                                    value={e}
                                    checked={field.value === e}
                                    onChange={() => {
                                        field.onChange(e);
                                    }}
                                />
                                {e}
                            </label>
                        );
                    });
                }}
            />
        </RadioWrap>
    );
};

export default HookformRadio;
