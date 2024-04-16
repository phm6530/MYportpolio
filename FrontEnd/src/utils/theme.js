import { createTheme } from '@mui/material';

// Check 퍼플
const colorTest = '#7055db';

const theme = createTheme({
    palette: {
        checkbox: {
            main: '#7055db',
        },
        secondary: {
            main: colorTest,
        },
    },
    typography: {
        fontSize: 14,
        h1: {
            fontSize: '2.125rem',
        },
        body1: {
            fontSize: '1rem',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'custom' },
                    style: {
                        color: '#fff',
                        backgroundColor: '#7055db',
                        '&:hover': {
                            backgroundColor: '#5e3fbf',
                        },
                    },
                },
            ],
        },

        MuiRadio: {
            //기본설정
            styleOverrides: {
                root: {
                    // 기본 색상을 secondary로 설정
                    color: colorTest,
                    opacity: 0.5,
                    padding: 4,
                    '&.Mui-checked': {
                        color: colorTest,
                        opacity: 1,
                    },
                },
            },
            variants: [
                {
                    props: { variant: 'customStyle1' }, // 첫 번째 커스텀 스타일
                    style: {
                        color: 'blue', // 기본 색상
                        '&.Mui-checked': {
                            color: 'darkblue', // 선택됐을 때 색상
                        },
                    },
                },
                {
                    props: { variant: 'customStyle2' }, // 두 번째 커스텀 스타일
                    style: {
                        color: 'green', // 기본 색상
                        '&.Mui-checked': {
                            color: 'darkgreen', // 선택됐을 때 색상
                        },
                    },
                },
            ],
        },

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
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: 14, // 여기에서 폰트 사이즈 설정
                },
            },
        },
    },
});

export default theme;
