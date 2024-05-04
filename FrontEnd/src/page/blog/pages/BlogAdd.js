import QuillEditor from 'component/editor/QuillEditor';
import useBlogCategory from 'features/Blog/hooks/useBlogCategory';
import CustomToolbar from 'component/editor/QuillCustumToolbar';
import { useSelector } from 'react-redux';
import EditorTitle from 'component/editor/EditorTitle';
import { useForm } from 'react-hook-form';

const BlogAdd = () => {
    const { data } = useBlogCategory();
    const auth = useSelector(state => state.authSlice);

    const {
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            post: '',
        },
    });
    return (
        <>
            {/* 에디터 */}
            <CustomToolbar />
            <EditorTitle
                type="text"
                placeholder="제목을 입력해주세요"
                error={errors}
                value="title"
                register={register}
            />
            <QuillEditor />
        </>
    );
};

export default BlogAdd;
