import { extendTheme } from '@chakra-ui/react';

const config = {};

export const theme = extendTheme({
    fonts: {
        body: 'SUIT-Regular',
        heading: 'NEXON Lv2 Gothic, sans-serif',
    },
    components: {
        Checkbox: {
            baseStyle: {
                control: {
                    border: '1px solid', // 테두리 두께 설정
                    borderColor: '#d5d5d5', // 평상시 테두리 색상
                    borderRadius: '5px',
                    // 체크되지 않았을 때의 배경색 설정을 원하면 다음 속성 사용:
                    bg: '#eaf0ff',

                    _hover: {
                        borderColor: 'olive.600', // 마우스 오버시 테두리 색상 변경
                    },

                    _checked: {
                        bg: '#7055db', // 체크된 상태의 배경색
                        borderColor: 'blue.500', // 체크된 상태의 테두리색

                        _hover: {
                            bg: 'blue.600', // 체크된 상태에서 마우스 오버시 배경색
                            borderColor: 'blue.600', // 체크된 상태에서 마우스 오버시 테두리색
                        },
                    },
                },
            },
        },
    },
    colors: {
        olive: {
            50: '#eff5e9',
            100: '#d5ddd3',
            200: '#bbc5b9',
            300: '#a1ad9e',
            400: '#879684',
            500: '#6e7c6a',
            600: '#556152',
            700: '#3c4539',
            800: '#222a21',
            900: '#051005',
        },
        perple: {
            50: '#eff5e9',
            100: '#d5ddd3',
            200: '#bbc5b9',
            300: '#a1ad9e',
            400: '#879684',
            500: '#6e7c6a',
            600: '#556152',
            700: '#3c4539',
            800: '#222a21',
            900: '#051005',
        },
    },
});
