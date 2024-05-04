import QuillEditor from 'component/editor/QuillEditor';
import useBlogCategory from 'features/Blog/hooks/useBlogCategory';
import CustomToolbar from 'component/editor/QuillCustumToolbar';
import EditorTitle from 'component/editor/EditorTitle';

import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import useKey from 'hooks/useKey';
import BlogCategory from 'features/Blog/BlogCategory';
import { Button } from 'component/ui/Button';

const BlogAdd = () => {
    const { data } = useBlogCategory();
    const { key } = useKey();
    const auth = useSelector(state => state.authSlice);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            category: '',
            post: '',
            user: auth.user, //유저정보 담아 보내기
        },
    });

    console.log(watch());

    const onSubmitHandler = data => {
        console.log('data::', data);
    };

    return (
        <>
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

                <QuillEditor />
                <Button.Submit style={{ marginLeft: 'auto' }}>
                    블로그 포스팅하기
                </Button.Submit>
            </form>
        </>
    );
};

export default BlogAdd;
