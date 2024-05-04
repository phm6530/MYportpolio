import styled from 'styled-components';
import { InputStyle } from 'component/ui/TextArea';
import { Wrapper } from './EditorStyle';
import InputErrorMessage from 'component/error/InputErrorMessage';

const CustomInputWrap = styled(InputStyle)`
    flex-grow: 1;
    font-size: 16px;
    ${props => props.$error && 'border: 1px solid red'}
`;

const EditorTitle = ({ placeholder, error, register }) => {
    return (
        <>
            <Wrapper>
                <CustomInputWrap
                    $error={error?.message}
                    placeholder={placeholder}
                    {...register}
                />
                {error && error && (
                    <InputErrorMessage>{error?.message}</InputErrorMessage>
                )}
            </Wrapper>
        </>
    );
};

export default EditorTitle;
