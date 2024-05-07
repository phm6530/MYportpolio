import CustomToolbar from 'component/editor/QuillCustumToolbar';
import EditorTitle from 'component/editor/EditorTitle';
import useKey from 'hooks/useKey';
import BlogCategory from 'features/Blog/BlogCategory';
import SubTitle from 'component/ui/Subtitle';
import TestQuillEditor from 'component/editor/TestQuillEditor';
import Loading from 'component/ui/Loading';

import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'component/ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blogPost } from 'services/blogService';
import { queryKey } from 'services/queryKey';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BlogAdd = () => {
    const navigate = useNavigate();
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

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: blogPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKey.blogCategory],
            });
            queryClient.invalidateQueries({ queryKey: [queryKey.blog] });
            toast.success('블로그 글이 포스팅되었습니다.');
            navigate('/blog?category=All');
        },
    });

    // 썸네일 + 간략한설명 추출
    const getContnets = post => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post;

        return {
            getImg: () => {
                const imgSelect = tempDiv.querySelector('img');
                return imgSelect ? imgSelect.getAttribute('src') : null;
            },
            getText: () => {
                const text = tempDiv.textContent;
                return text.slice(0, 150);
            },
        };
    };

    // Sumit
    const onSubmitHandler = data => {
        const content = getContnets(data.post);
        const thumNail = content.getImg();
        const description = content.getText();

        const requestData = { ...data, key: postKey, thumNail, description };
        mutate(requestData);
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
