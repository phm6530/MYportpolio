import styled from 'styled-components';
import ErrorBubble from 'component/error/ErrorBubble';
import { Controller } from 'react-hook-form';

const RadioWrap = styled.div`
    position: relative;
    display: flex;
`;

const HookformRadio = ({ Radio, control, errors, keyName }) => {
    console.log(keyName);
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
                        return (
                            <label key={`key-${e}`}>
                                <input
                                    type="radio"
                                    {...field}
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
