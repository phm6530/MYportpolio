import styled from 'styled-components';
import { InputStyle, InputLabel, TextAreaStyle } from 'component/ui/TextArea';
import { Wrapper } from './EditorStyle';
import InputErrorMessage from 'component/error/InputErrorMessage';

const CustumTextAreaStyle = styled(TextAreaStyle)`
    flex-grow: 1;
`;

const EditorTextArea = ({
    label,
    type,
    placeholder,
    error,
    value,
    register,
}) => {
    return (
        <>
            <Wrapper>
                <InputLabel>{label}</InputLabel>
                <CustumTextAreaStyle
                    $error={error[value]?.message}
                    type={type}
                    placeholder={placeholder}
                    {...register(value)}
                />
                {error && error[value] && (
                    <InputErrorMessage>
                        {error[value]?.message}
                    </InputErrorMessage>
                )}
            </Wrapper>
        </>
    );
};

export default EditorTextArea;
