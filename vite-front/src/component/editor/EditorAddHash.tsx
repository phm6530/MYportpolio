import styled from 'styled-components';
import InputErrorMessage from 'component/error/InputErrorMessage';
import { InputLabel, InputStyle } from 'component/ui/TextArea';
import { forwardRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';
import { HashTag } from '@style/commonStyle';
import { Button } from '@mui/material';
import { Wrapper } from './EditorStyle';

const CustomInputWrap = styled(InputStyle)`
    flex-grow: 1;
    ${props => props.$error && 'border: 1px solid red'}
`;

const InputWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    max-width: 300px;
    width: 90%;
`;

const HashtagWrap = styled.div`
    border: 1px solid ${({ theme }) => theme.listColor};
    background: ${({ theme }) => theme.listBackground};
    border-radius: 0.3rem;
    padding: 0.5rem 0.5rem;
    min-height: 30px;
`;

const EditorAddHash = forwardRef(
    (
        {
            label,
            placeholder,
            error,
            value,
            control,
            setError,
            trigger,
            getValues,
        },
        ref,
    ) => {
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
                <Wrapper>
                    <InputLabel>{label}</InputLabel>

                    <InputWrap>
                        <CustomInputWrap ref={ref} placeholder={placeholder} />

                        <Button variant="outlined" onClick={addHashtag}>
                            Add
                        </Button>
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
                </Wrapper>
            </>
        );
    },
);

export default EditorAddHash;
