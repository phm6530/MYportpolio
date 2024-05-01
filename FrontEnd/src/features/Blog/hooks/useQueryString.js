import { useNavigate } from 'react-router-dom';

const useQueryString = path => {
    const navigate = useNavigate();

    const navigateHandler = params => {
        const query = Object.keys(params)
            .map(
                key =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
            )
            .join('&');
        navigate(`/${path}?${query}`, { replace: true });
    };

    return {
        navigateHandler,
    };
};

export default useQueryString;
