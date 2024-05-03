import PostInput from 'features/common/Post/PostInput';
import { useAuthCheck } from 'hooks/useAuthCheck';
import useAuthRedirect from 'hooks/useAuthRedirect';
import { useForm } from 'react-hook-form';

const BlogAdd = () => {
    const { register, handleSubmit, setValue } = useForm();
    useAuthRedirect('/blog');
    return (
        <>
            Add
            <PostInput />
        </>
    );
};

export default BlogAdd;
