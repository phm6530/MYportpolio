import styled from 'styled-components';
import { InputLabel, TextAreaStyle } from 'component/ui/TextArea';
import { Wrapper } from './EditorStyle';
import InputErrorMessage from 'component/error/InputErrorMessage';
import React from 'react';
import { ProjectDetailProps } from '@type/ProjectTypes';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

const CustumTextAreaStyle = styled(TextAreaStyle)<{ $error?: string }>`
    flex-grow: 1;
`;

interface EditorTextAreaProps {
    label: string;
    placeholder: string;
    value: keyof ProjectDetailProps;
    error: FieldErrors<ProjectDetailProps>;
    register: UseFormRegister<ProjectDetailProps>;
}

const EditorTextArea: React.FC<EditorTextAreaProps> = ({
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
                <CustumTextAreaStyle
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

export default EditorTextArea;
