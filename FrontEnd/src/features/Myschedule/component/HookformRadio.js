import styled from 'styled-components';
import ErrorBubble from 'component/error/ErrorBubble';
import { Controller } from 'react-hook-form';

const RadioWrap = styled.div`
    position: relative;
    display: flex;
`;

const HookformRadio = ({ Radio, control, errors, keyName }) => {
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
