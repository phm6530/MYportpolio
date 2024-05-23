import styled from 'styled-components';
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useFormContext,
} from 'react-hook-form';

const FormStyle = styled.form`
    box-sizing: border-box;
    border: 2px solid #56565663;
    border-radius: 5em;
    overflow: hidden;

    input {
        width: 80px;
    }
`;

const ButtonSTyle = styled.button`
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    padding: 2px 5px;
`;

export default function CommentDelete({ mutate, board_key, setSelectIdx }) {
    const { handleSubmit, reset } = useFormContext();

    const onSubmitHandler: SubmitHandler<FieldValues> = async data => {
        const password = data.password;
        const formData = {
            reply_password: password,
            board_key: board_key,
        };

        mutate(formData);
    };

    return (
        <>
            <FormStyle onSubmit={handleSubmit(onSubmitHandler)}>
                <Controller
                    name="password"
                    render={({ field }) => (
                        <input autoComplete="off" type="password" {...field} />
                    )}
                />
                <ButtonSTyle type="submit">확인</ButtonSTyle>
                <ButtonSTyle
                    type="button"
                    onClick={() => {
                        setSelectIdx(null);
                        reset();
                    }}
                >
                    취소
                </ButtonSTyle>
            </FormStyle>
        </>
    );
}
