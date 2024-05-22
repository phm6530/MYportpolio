import { Wrapper } from 'component/editor/EditorStyle';
import InputErrorMessage from 'component/error/InputErrorMessage';
import styled from 'styled-components';
import useBlogCategory from '../hooks/useBlogCategory';
import { useEffect, useState } from 'react';
import { InputLabel } from 'component/ui/TextArea';
import { BlogCategoryResponse } from '@features/Blog/BlogTypes';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

const Select = styled.select<{ $error: boolean }>`
    background: var(--color-background-input);
    padding: 0.5rem 0.5rem;
    border-radius: 0.3rem;
    width: 10rem;
    font-size: 14px;
    border: ${props =>
        props.$error ? '1px solid var(--color-error)' : 'none'};
`;

const Option = styled.option``;

interface BlogCategoryProps {
    error?: FieldError;
    register: UseFormRegister<FieldValues>;
}

const BlogSelectCategory: React.FC<BlogCategoryProps> = ({
    error,
    register,
}) => {
    const { data, isLoading } = useBlogCategory();
    const [categories, setCategories] = useState<string[]>([]);
    const [list, setList] = useState<BlogCategoryResponse>();

    useEffect(() => {
        if (!isLoading && data) {
            const list = Object.keys(data);
            setCategories(list);
            setList(data);
        }
    }, [data, isLoading]);

    return (
        <>
            <Wrapper>
                <InputLabel>카테고리</InputLabel>
                <Select {...register} $error={!!error} defaultValue="">
                    <Option value="" disabled>
                        카테고리 선택
                    </Option>
                    {list &&
                        categories.map((category, idx) => {
                            const categoryData = list[category];

                            console.log(categoryData);
                            if (typeof categoryData === 'object') {
                                const keys = Object.keys(categoryData);

                                return (
                                    <optgroup label={category} key={category}>
                                        {keys.map((e, subIdx) => {
                                            const cnt =
                                                categoryData[e].post_count;
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
                            }
                        })}
                </Select>
                {error && (
                    <InputErrorMessage>{error.message}</InputErrorMessage>
                )}
            </Wrapper>
        </>
    );
};

export default BlogSelectCategory;
