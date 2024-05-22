import EditorTitle from 'component/editor/EditorTitle';
import BlogSelectCategory from '@features/Blog/BlogselectCategory/BlogSelectCategory';
import { SubTitle } from 'component/ui/Subtitle';
import TestQuillEditor from 'component/editor/TestQuillEditor';

import { useSelector } from 'react-redux';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'component/ui/Button';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { EditorGetPreview } from 'component/editor/EditorGetPreview';
import { useEffect, useState } from 'react';

import DotLoading from 'component/loading/DotLoading';
import useBlogPostDetail from '@features/Blog/hooks/useBlogPostDetail';
import useBlogPostAction from '@features/Blog/hooks/useBlogPostAction';

//타입 get
import { RootState } from 'store/appSlice';

const BlogAdd = (): JSX.Element => {
    const [params] = useSearchParams();
    const userData = useSelector((state: RootState) => state.auth.user);

    const postId = params.get('post');
    const editorType = params.get('type');

    const { data } = useBlogPostDetail(postId);
    const { mutate, isPending } = useBlogPostAction(editorType, postId);
    const [postKey, setPostKey] = useState(() => editorType || uuidv4());

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            category: '',
            post: '',
            user: userData, //유저정보 담아 보내기
        },
    });

    useEffect(() => {
        // ?type=edit 시 formData에 value 삽입
        if (editorType === 'modify' && data?.resData) {
            const { post_title, category, subcategory, contents, imgkey } =
                data.resData;
            reset({
                title: post_title,
                category: `${category}:${subcategory}`,
                post: contents,
                user: userData,
            });
            setPostKey(imgkey);
        }
    }, [data, reset, editorType, userData]);

    // Submit
    const onSubmitHandler: SubmitHandler<FormData> = data => {
        const content = EditorGetPreview(data.post);
        const thumNail = content.getImg();
        const description = content.getText();

        const requestData = { ...data, key: postKey, thumNail, description };
        mutate(requestData);
    };

    return (
        <>
            {isPending && <DotLoading />}
            <SubTitle>
                <div className="subText">
                    <span className="point">BLOG POST</span>
                </div>
            </SubTitle>

            {/* 선택 카테고리 */}
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <BlogSelectCategory
                    error={errors.category}
                    register={register('category', {
                        required: '필수항목 입니다.',
                    })}
                />

                {/* quill 툴바 */}
                {/* <CustomToolbar /> */}

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
