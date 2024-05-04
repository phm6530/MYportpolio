import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 :root {
    --color-white: rgb(182, 190, 201);
    --color-text: ${({ theme }) => theme.textColor};
    --color-background: ${({ theme }) => theme.backgroundColor};
    --color-popup-background: ${({ theme }) => theme.backgroundColorType1};

    --color-hash-tag-text: ${({ theme }) => theme.tagColor};
    --color-hash-tag-background: ${({ theme }) => theme.tagBackground};

    --color-error: #d32f2f;
    --color-error-secondary: #ffcece;
    --color-lightBlue  : rgb(120, 141, 170);


    --background-color-btn1 : ${({ theme }) => theme.btnBackground};
    --border--btn-type-1 : ${({ theme }) => theme.btnBorderType1};
    --background-color-box : ${({ theme }) => theme.boxBackground};
    --color-background-input : ${({ theme }) => theme.inputBackground};

    --quill-toolbar-color : ${({ theme }) => theme.toolbarColor}
    
  }


  body {
    color: var(--color-text);
    background: var(--color-background);
    transition: background .5s ease;
  }
`;

export const lightTheme = {
    textColor: '#333',
    backgroundColor: '#FFF',
    asdf: '#ebe5e5',
    descriptionColor: '#888c94',

    boxBackground: '#fff',

    // input
    searchBackground: '#fbfbfb',
    backgroundColorType1: '#eef8ff',

    inputBackground: '#fcfeff',

    // errorColor
    tabCnt: 'rgb(102, 179, 255)',

    tagColor: 'rgb(139 122 202);',
    tagBackground: 'rgb(226 226 226 / 32%)',

    btnBackground: '#212b35',

    listBackground: 'rgba(29, 33, 38, 0.1)',
    listColor: 'rgba(61, 71, 81, 0.3)',

    btnBorderType1: '1px solid rgb(217 224 232 / 3%)',
    toolbarColor: '#444',
};

export const darkTheme = {
    textColor: '#FFF',
    backgroundColor: '#0f1214',
    asdf: '#454545',
    descriptionColor: '#c9c9c9',
    boxBackground: 'rgb(11, 13, 14)',
    // input
    searchBackground: '#161b24',

    btnBackground: '#212b35',

    backgroundColorType1: '#353b3f',
    inputBackground: '#262e3d',

    tabCnt: 'rgb(102, 179, 255)',

    // hash
    tagColor: 'rgb(186 179 214);',
    tagBackground: 'rgb(85 73 129 / 32%)',

    listBackground: 'rgb(71 78 87 / 10%)',
    listColor: 'rgba(61, 71, 81, 0.3)',

    btnBorderType1: '1px solid rgba(48, 56, 64, 0.5)',

    toolbarColor: 'rgb(120, 141, 170)',
};
