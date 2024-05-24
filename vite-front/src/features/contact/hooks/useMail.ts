import { useMutation } from '@tanstack/react-query';
import { fetchMailHandler } from 'services/contactService';

const useMail = () => {
    return useMutation({
        mutationFn: fetchMailHandler,
    });
};

export default useMail;
