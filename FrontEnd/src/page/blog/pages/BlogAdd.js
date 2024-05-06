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
import { useMutation } from '@tanstack/react-query';
import { blogloadImage } from 'services/blogService';
import Loading from 'component/ui/Loading';

const BlogAdd = () => {
    const { data } = useBlogCategory();
    const { key: postKey } = useKey();
    const auth = useSelector(state => state.authSlice);

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

    const { mutate, isPending } = useMutation({
        mutationFn: blogloadImage,
    });

    const onSubmitHandler = data => {
        const formData = new FormData();
        const { category } = data;
        // imgFile.forEach(file => {
        //     // 파일명에서 특수 문자 및 공백을 처리하여 올바른 형식으로 변환합니다.
        //     const normalizedFileName = normalizeFileName(file.name);
        //     formData.append('images', file, normalizedFileName); // 파일명을 함께 추가합니다.
        // });

        // 이미지 + category 전송
    };

    return (
        <>
            {isPending && <Loading />}
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
                {postKey && (
                    <Controller
                        name="post"
                        control={control}
                        render={({ field }) => {
                            const { ref: _, ...restField } = field; // `ref`를 제외하고 나머지 필드를 추출
                            return (
                                <TestQuillEditor
                                    postKey={postKey}
                                    {...restField} // `ref`를 제외한 나머지 프로퍼티 전달
                                    // PROJECT_KEY={projectKey}
                                />
                            );
                        }}
                    />
                )}
                <Button.Submit style={{ marginLeft: 'auto' }}>
                    블로그 포스팅하기
                </Button.Submit>
            </form>
        </>
    );
};

export default BlogAdd;
