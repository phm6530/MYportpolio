import QuillEditor from 'component/editor/QuillEditor';
import useBlogCategory from 'features/Blog/hooks/useBlogCategory';
import CustomToolbar from 'component/editor/QuillCustumToolbar';
import EditorTitle from 'component/editor/EditorTitle';

import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import useKey from 'hooks/useKey';
import BlogCategory from 'features/Blog/BlogCategory';
import { Button } from 'component/ui/Button';
import SubTitle from 'component/ui/Subtitle';
import TestQuillEditor from 'component/editor/TestQuillEditor';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { blogloadImage } from 'services/blogService';

const BlogAdd = () => {
    const { data } = useBlogCategory();
    const auth = useSelector(state => state.authSlice);
    const { key } = useKey();
    const [imgFile, setImgFile] = useState([]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            category: '',
            post: '',
            user: auth.user, //유저정보 담아 보내기
        },
    });

    const { mutate } = useMutation({
        mutationFn: blogloadImage,
    });

    const onSubmitHandler = data => {
        const formData = new FormData();
        const { category } = data;
        console.log(key);
        console.log(category);
        console.log(imgFile);
        formData.append('images', imgFile);

        // 이미지 + category 전송
        mutate(category, key, formData);
    };

    return (
        <>
            <SubTitle>
                <div className="subText">
                    <span className="point">BLOG POST</span>
                </div>
            </SubTitle>

            {/* 선택 카테고리 */}
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <BlogCategory
                    list={data?.resData}
                    error={errors?.['category']}
                    register={register('category', {
                        required: '필수항목 입니다.',
                    })}
                />

                {/* quill 툴바 */}
                <CustomToolbar />

                {/* quill 에디터 */}
                <EditorTitle
                    placeholder="제목을 입력해주세요"
                    error={errors?.['title']}
                    register={register('title', {
                        required: '필수항목 입니다.',
                    })}
                />

                <Controller
                    name="post"
                    control={control}
                    render={({ field }) => {
                        const { ref, ...restField } = field; // `ref`를 제외하고 나머지 필드를 추출
                        return (
                            <TestQuillEditor
                                setImgFile={setImgFile}
                                {...restField} // `ref`를 제외한 나머지 프로퍼티 전달
                                // PROJECT_KEY={projectKey}
                            />
                        );
                    }}
                />

                <Button.Submit style={{ marginLeft: 'auto' }}>
                    블로그 포스팅하기
                </Button.Submit>
            </form>
        </>
    );
};

export default BlogAdd;
