import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';

const useKey = () => {
    const [Params] = useSearchParams();
    const key = Params.get('key') || uuidv4();

    return { key };
};

export default useKey;
