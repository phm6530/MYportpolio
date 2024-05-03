import { InputLabel } from 'component/ui/TextArea';
import InputErrorMessage from 'component/error/InputErrorMessage';
import { Wrapper } from './EditorStyle';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const ProjectSkillWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

const CheckStyle = styled.label`
    display: inline-block;
    color: #555969;
    border-radius: 4px;
    padding: 0.3rem 0.5rem;
    font-size: 12px;
    font-weight: bold;
    margin-right: 0.6rem;
    color: rgb(120, 141, 170);
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    cursor: pointer;
    padding: 0.3rem 0.3rem;
    margin-bottom: 1rem;
    & input {
        margin-right: 0.5rem;
    }
`;

const EditorChecklist = ({ label, error, value, list }) => {
    const { register, getValues } = useFormContext();

    const isCheck = checkValue => {
        const values = getValues(value) || []; // 기본값을 빈 배열로 설정
        return values.some(skill => skill === checkValue);
    };

    return (
        <Wrapper>
            <div style={{ display: 'flex' }}>
                <InputLabel>{label}</InputLabel>
                {error && error[value] && (
                    <InputErrorMessage>
                        {error[value]?.message}
                    </InputErrorMessage>
                )}
            </div>
            <ProjectSkillWrap>
                {list.map((e, idx) => {
                    return (
                        <CheckStyle key={idx}>
                            <input
                                type="checkbox"
                                key={e}
                                label={e}
                                onChange={() => isCheck(e)}
                                {...register(value)}
                            />
                            {e}
                        </CheckStyle>
                    );
                })}
            </ProjectSkillWrap>
        </Wrapper>
    );
};

export default EditorChecklist;
