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

    /* box Shadow */
    --box-shadow-style : ${({ theme }) => theme.div_BoxShaodw};
    
    /* searchStyle */
    --search-border-color : ${({ theme }) => theme.searchBorder};
    --search-Background-color :${({ theme }) => theme.searchBackground};
    /* quill */
    --quill-toolbar-color : ${({ theme }) => theme.toolbarColor};
    
    /* 그라디언트 */
    --gradient-title-color : ${({ theme }) => theme.gradiendtTitle};

    /* border 색상 */
    --borer-line-color : ${({ theme }) => theme.borderColor};

    /* Description Color */
    --color-description-color : ${({ theme }) => theme.descriptionColor};

    /* tab or list hover color */
    --hover-color : #7f8fae;

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
    descriptionColor: '#63676f',
    boxBackground: '#fff',

    // input
    searchBackground: '#fcfcfc',
    searchBorder: '1px solid transparent',

    backgroundColorType1: '#eef8ff',

    inputBackground: '#fcfeff',

    // errorColor
    tabCnt: 'rgb(60 114 166)',

    tagColor: 'rgb(139 122 202);',
    tagBackground: 'rgb(226 226 226 / 32%)',

    btnBackground: '#212b35',
    listBackground: 'rgba(29, 33, 38, 0.1)',

    listColor: 'rgba(61, 71, 81, 0.3)',

    btnBorderType1: '1px solid rgb(217 224 232 / 3%)',
    toolbarColor: '#444',

    gradiendtTitle: 'linear-gradient(to left, #7264ef, #7264ef, #dd8efc)',

    // border line Style
    borderColor: 'rgba(61 71 81 / 10%)',

    div_BoxShaodw: '0 0 40px rgb(0 0 0 / 2%)',
};

export const darkTheme = {
    textColor: '#d3d3d3',
    backgroundColor: '#1b1d21',
    asdf: '#454545',
    descriptionColor: '#c5c5c5',
    boxBackground: '#1b1d21',

    // input
    searchBackground: '#252931',
    searchBorder: '1px solid rgb(71 77 89)',

    btnBackground: '#212b35',

    backgroundColorType1: '#353b3f',
    inputBackground: '#1d2025',

    tabCnt: 'rgb(102, 179, 255)',

    // hash
    tagColor: 'rgb(186 179 214);',
    tagBackground: 'rgb(85 73 129 / 32%)',

    listBackground: 'rgb(71 78 87 / 10%)',
    listColor: 'rgba(61, 71, 81, 0.3)',

    btnBorderType1: '1px solid rgba(48, 56, 64, 0.5)',

    toolbarColor: 'rgb(120, 141, 170)',
    gradiendtTitle: 'linear-gradient(to left, #64c7ef, #a9a5cc, #8e9bfc)',

    // border line Style
    borderColor: 'rgba(61 71 81 / 72%)',
    div_BoxShaodw: '0 -50px 40px rgba(0, 0, 0, 0.4)',
};
