import { useNavigate } from 'react-router-dom';

const useQueryString = () => {
    const navigate = useNavigate();

    const navigateHandler = params => {
        const query = Object.keys(params)
            .map(
                key =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
            )
            .join('&');

        navigate(`?${query}`);
    };

    return {
        navigateHandler,
    };
};

export default useQueryString;
