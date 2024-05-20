import styled from 'styled-components';
import { InputStyle, InputLabel } from 'component/ui/TextArea';
import { Wrapper } from './EditorStyle';
import InputErrorMessage from 'component/error/InputErrorMessage';

const CustomInputWrap = styled(InputStyle)`
    flex-grow: 1;
    ${props => props.$error && 'border: 1px solid red'}
`;

const EditorInput = ({ label, type, placeholder, error, value, register }) => {
    return (
        <>
            <Wrapper>
                <InputLabel>{label}</InputLabel>
                <CustomInputWrap
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

export default EditorInput;
