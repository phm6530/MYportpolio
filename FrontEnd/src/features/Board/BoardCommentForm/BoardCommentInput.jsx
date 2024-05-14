import { forwardRef } from 'react';
import { InputStyle, TextAreaStyle } from 'component/ui/TextArea';

import styled from 'styled-components';
import ErrorBubble from 'component/error/ErrorBubble';

const FormInputDiv = styled.div`
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
    flex-direction: column;

    textarea {
        width: 100%;
        min-height: 10px;
    }

    input:focus,
    textarea:focus {
        background: #fff;
    }

    span {
        left: 10px;
        display: block;
        font-weight: bold;
        width: 80px;
        margin-left: 5px;
        margin-bottom: 1px;
    }
`;
const BoardCommentInput = forwardRef((fields, ref) => {
    const { isAuth, label, error, ...props } = fields;

    return (
        <>
            <FormInputDiv>
                <span>{label}</span>
                {fields.type === 'textarea' ? (
                    <TextAreaStyle $error={error} {...props} />
                ) : (
                    <InputStyle
                        $error={error}
                        ref={ref}
                        type={fields.name === 'password' ? 'password' : 'text'}
                        autoComplete="off"
                        disabled={isAuth}
                        {...props}
                    />
                )}
                {error && <ErrorBubble>{error.message}</ErrorBubble>}
            </FormInputDiv>
        </>
    );
});

export default BoardCommentInput;
