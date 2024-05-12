import { useEffect } from 'react';

const useAddTransition = () => {
    useEffect(() => {
        document.body.classList.add('enable-transition');
    }, []);
};

export default useAddTransition;
