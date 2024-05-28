import styled from 'styled-components';
import InputErrorMessage from 'component/error/InputErrorMessage';
import { InputStyle, InputLabel } from 'component/ui/TextArea';
import { Wrapper } from './EditorStyle';
import { ProjectDetailProps } from '@type/ProjectTypes';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

const CustomInputWrap = styled(InputStyle)<{ $error?: string }>`
    flex-grow: 1;
    ${props => props.$error && 'border: 1px solid red'}
`;

interface EditorInputProps {
    label: string;
    placeholder: string;
    error: FieldErrors<ProjectDetailProps>;
    value: keyof ProjectDetailProps;
    register: UseFormRegister<ProjectDetailProps>;
}

const EditorInput: React.FC<EditorInputProps> = ({
    label,
    placeholder,
    error,
    value,
    register,
}) => {
    return (
        <>
            <Wrapper>
                <InputLabel>{label}</InputLabel>
                <CustomInputWrap
                    $error={error[value]?.message}
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
