import styled from 'styled-components';

const Select = styled.select`
    background: var(--color-background-input);
    padding: 0.5rem 0.5rem;
    border-radius: 0.3rem;
    width: 10rem;
    font-size: 14px;
    border: ${props => props.$error && '1px solid var(--color-error)'};
`;

const Option = styled.option``;

const BlogCategory = ({ list, error, register }) => {
    const categories = Object.keys(list);

    console.log(list);

    return (
        <>
            <Select {...register} $error={error}>
                <Option value="" disabled selected>
                    카테고리 선택
                </Option>
                {categories.map((category, idx) => {
                    const keys = Object.keys(list[category]);
                    return (
                        <optgroup label={category} key={category}>
                            {keys.map((e, subIdx) => {
                                const cnt = list[category][e].count;

                                return (
                                    <Option
                                        value={e}
                                        key={`${category}-${e}-${subIdx}`}
                                    >
                                        {e} ({cnt})
                                    </Option>
                                );
                            })}
                            <Option
                                disabled={true}
                                key={`divider-${category}-${idx}`}
                            >
                                -------------------
                            </Option>
                        </optgroup>
                    );
                })}
            </Select>
        </>
    );
};

export default BlogCategory;
