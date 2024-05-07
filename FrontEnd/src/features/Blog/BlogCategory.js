import { Wrapper } from 'component/editor/EditorStyle';
import InputErrorMessage from 'component/error/InputErrorMessage';
import styled from 'styled-components';
import useBlogCategory from './hooks/useBlogCategory';
import { useEffect, useState } from 'react';

const Select = styled.select`
    background: var(--color-background-input);
    padding: 0.5rem 0.5rem;
    border-radius: 0.3rem;
    width: 10rem;
    font-size: 14px;
    border: ${props => props.$error && '1px solid var(--color-error)'};
`;

const Option = styled.option``;

const BlogCategory = ({ error, register }) => {
    const { data } = useBlogCategory();
    const [categories, setCategories] = useState([]);
    const [list, setList] = useState({});

    useEffect(() => {
        setCategories(Object.keys(data?.resData));
        setList(data?.resData);
    }, [data]);

    return (
        <>
            <Wrapper>
                <Select {...register} $error={error} defaultValue="">
                    <Option value="" disabled>
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
                                            value={`${category}:${e}`}
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
                {error && error && (
                    <InputErrorMessage>{error?.message}</InputErrorMessage>
                )}
            </Wrapper>
        </>
    );
};

export default BlogCategory;
