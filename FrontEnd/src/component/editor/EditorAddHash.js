import styled from 'styled-components';
import InputErrorMessage from 'component/error/InputErrorMessage';
import { InputLabel, InputStyle } from 'component/ui/TextArea';
import { forwardRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';

const CustomInputWrap = styled(InputStyle)`
    flex-grow: 1;
    ${props => props.$error && 'border: 1px solid red'}
`;

const InputWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const HashTag = styled.div`
    align-items: center;
    display: inline-flex;
    font-weight: 500;
    font-size: 11px;
    padding: 2px 7px;
    border-radius: 11px;
    color: rgb(139 122 202);
    background-color: rgb(226 226 226 / 32%);
    margin-right: 0.6rem;
    align-items: center;
    font-weight: bold;
    margin-bottom: 0.3rem;
    svg {
        margin-left: 0.4rem;
    }
`;

const HashtagWrap = styled.div``;

const EditorAddHash = forwardRef(
    ({ label, placeholder, error, value, control }, ref) => {
        const { setError, trigger, getValues } = useFormContext();

        const { fields, append, remove } = useFieldArray({
            control,
            name: value,
        });

        const addHashtag = e => {
            e.preventDefault();

            const newValue = ref.current.value;
            if (!newValue) {
                setError(value, {
                    type: 'custom',
                    message: '해시태그를 입력해주세요.',
                });
                return;
            }

            if (newValue && !fields.some(field => field.value === newValue)) {
                append(newValue);
                trigger(value);
                ref.current.value = '';
            }
        };

        return (
            <>
                <InputLabel>{label}</InputLabel>
                <CustomInputWrap ref={ref} placeholder={placeholder} />

                <InputWrap>
                    <button onClick={addHashtag}>Add</button>
                </InputWrap>

                {error && error[value] && (
                    <InputErrorMessage>
                        {error[value]?.message}
                    </InputErrorMessage>
                )}

                <HashtagWrap>
                    {getValues(value).map((field, index) => {
                        return (
                            <HashTag key={`hash${index}`}>
                                {field}
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                >
                                    <MdCancel />
                                </button>
                            </HashTag>
                        );
                    })}
                </HashtagWrap>
            </>
        );
    },
);

export default EditorAddHash;
