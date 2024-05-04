import { InputLabel } from 'component/ui/TextArea';
import InputErrorMessage from 'component/error/InputErrorMessage';
import { Wrapper } from './EditorStyle';
import styled from 'styled-components';

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

    display: flex;
    cursor: pointer;
    padding: 0.3rem 0.3rem;
    & input {
        margin-right: 0.5rem;
    }

    border: 1px solid rgba(48, 56, 64, 0.5);
`;

const EditorChecklist = ({
    label,
    error,
    value,
    list,
    register,
    getValues,
}) => {
    const isCheck = checkValue => {
        const values = getValues(value) || []; // 기본값을 빈 배열로 설정
        return values.some(skill => skill === checkValue);
    };

    return (
        <Wrapper>
            <div style={{ display: 'flex' }}>
                <InputLabel>{label}</InputLabel>
            </div>
            <ProjectSkillWrap>
                {list.map((item, idx) => {
                    return (
                        <CheckStyle key={idx}>
                            <input
                                type="checkbox"
                                key={item}
                                label={item}
                                value={item}
                                onChange={() => isCheck(item)}
                                {...register(value)}
                            />
                            {item}
                        </CheckStyle>
                    );
                })}
                {error && error[value] && (
                    <InputErrorMessage>
                        {error[value]?.message}
                    </InputErrorMessage>
                )}
            </ProjectSkillWrap>
        </Wrapper>
    );
};

export default EditorChecklist;
