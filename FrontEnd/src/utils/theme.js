import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        checkbox: {
            main: '#7055db',
        },
        secondary: {
            main: '#ff5722',
        },
    },
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '& .MuiSvgIcon-root': {
                        width: '1em',
                        height: '1em',
                    },
                    '&.Mui-checked': {
                        color: '#7055db',
                    },
                },
            },
        },
    },
});

export default theme;
