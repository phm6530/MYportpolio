import styled from 'styled-components';
import { InputStyle, InputLabel } from 'component/ui/TextArea';
import { Wrapper } from './EditorStyle';
import InputErrorMessage from 'component/error/InputErrorMessage';

const CustomInputWrap = styled(InputStyle)`
    flex-grow: 1;
    ${props => props.$error && 'border: 1px solid red'}
`;

const EditorTitle = ({ placeholder, error, value, register }) => {
    return (
        <>
            <Wrapper>
                <CustomInputWrap
                    $error={error[value]?.message}
                    placeholder={placeholder}
                    {...register(value, { required: '필수 항목입니다. ' })}
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

export default EditorTitle;
