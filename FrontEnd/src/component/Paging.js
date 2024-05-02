import { Pagination, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Paging = () => {
    const navigate = useNavigate();

    const handleChange = (_, value) => {
        navigate(`?page=${value}`);
    };

    return (
        <Stack spacing={2} alignItems="center" justifyContent="center">
            <Pagination count={2} onChange={handleChange} />
        </Stack>
    );
};

export default Paging;
