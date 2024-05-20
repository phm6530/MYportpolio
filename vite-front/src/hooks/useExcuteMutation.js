import { ReactQuery, ReactRedux } from 'lib/lib';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import alertThunk from 'store/alertTrunk';

const { useMutation, useQueryClient } = ReactQuery;
const { useDispatch } = ReactRedux;

const useExcuteMutation = (fetchFn, key, text) => {
    const queryclient = useQueryClient();
    const dispatch = useDispatch();

    const { mutate, isError, error } = useMutation({
        mutationFn: formData => fetchFn(formData),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: key });
            if (!text) return;
            toast.success(`${text}되었습니다.`);
        },
    });

    useEffect(() => {
        if (isError && error) {
            dispatch(alertThunk(error.message, 0));
        }
    }, [isError, error, dispatch]);

    return { mutate };
};

export default useExcuteMutation;
