import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7055db', // 체크박스 포함, 모든 primary 색상에 사용될 기본색
        },
        secondary: {
            main: '#ff5722', // 두 번째 체크박스에서 사용할 색상
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
