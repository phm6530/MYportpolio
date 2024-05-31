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
    --gradient-subtitle-color : ${({ theme }) => theme.gradiendSubTitle};

    /* border 색상 */
    --borer-line-color : ${({ theme }) => theme.borderColor};
    --borer-line-picture-color : ${({ theme }) => theme.border_picture_color};
    --border-field-border-color : ${({ theme }) => theme.listColor}

    /* Description Color */
    --color-description-color : ${({ theme }) => theme.descriptionColor};

    /* tab or list hover color */
    --hover-color : #7f8fae;

    /* tab or list hover color */
    --background-field-border-color : ${({ theme }) => theme.listBackground};
    --background-disable--input : ${({ theme }) => theme.background_disable_input};

    /* Nav */
    --Nav-Background-color : ${({ theme }) => theme.navBackground};
    --Nav-color : ${({ theme }) => theme.navColor};
    --Nav-navBorder : ${({ theme }) => theme.navBorder};


    /* 카테고리 버튼 */
    --background-category-color :${({ theme }) => theme.tabButtonColor};
    --border-darkMode-color :${({ theme }) => theme.boderDarkModeButton};
  }



  
  

  body {
    color: var(--color-text);
    overflow-x: hidden;
    background: var(--color-background);
    font-family: 'SUIT-Regular', sans-serif;
  }

  /* 초기 변환 트랜지션 방지 */
    body.enable-transition {
      transition: background 0.5s ease;
    }

   /* Disable */
   input:disabled {
        background: var( --background-disable--input);
        opacity: 0.5;
    }
    select {
        border: none;
        outline: none;
    }

    label {
        display: block;
    }
`;

export const lightTheme = {
    textColor: '#333',
    backgroundColor: '#FFF',
    asdf: '#ebe5e5',
    descriptionColor: '#63676f',
    boxBackground: '#fff',

    // input
    searchBackground: '#f7f4f4',
    searchBorder: '1px solid transparent',

    backgroundColorType1: '#fff',

    inputBackground: '#fcfeff',

    // errorColor
    tabCnt: 'rgb(60 114 166)',

    tagColor: 'rgb(139 122 202);',
    tagBackground: 'rgb(226 226 226 / 32%)',

    btnBackground: '#212b35',
    listBackground: 'rgb(238 238 238 / 15%)',

    listColor: 'rgba(61, 71, 81, 0.3)',

    btnBorderType1: '1px solid rgb(47 59 73 / 5%)',
    toolbarColor: '#444',

    gradiendtTitle: 'linear-gradient(to left, #7264ef, #7264ef, #dd8efc)',
    gradiendSubTitle: 'linear-gradient(to left, #a35d5d, #6a5f86, #5262a8)',
    // border line Style
    borderColor: 'rgb(0 0 0 / 10%)',

    div_BoxShaodw: '50px 50px 55px rgba(0, 0, 0, 0.1)',
    background_disable_input: '#ededed',

    border_picture_color: '#fff',

    //navTheme
    navBackground: '#ffffff80',
    navColor: '#333',
    navBorder: '1px solid rgb(158 158 158 / 10%)',

    // tabBUtton
    tabButtonColor: '#d6d6d652',
    boderDarkModeButton: '#bbbbbb4f',
};

export const darkTheme = {
    textColor: '#e7e7e7',
    backgroundColor: '#191e22',
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
    gradiendSubTitle: 'linear-gradient(to left, #64c7ef, #a9a5cc, #8e9bfc)',

    // border line Style
    borderColor: 'rgb(98 114 129 / 19%)',
    div_BoxShaodw: '0 0px 40px rgba(0, 0, 0, 0.4)',
    background_disable_input: '#0000004f',

    border_picture_color: '#515867',

    //Nav Theme
    navBackground: '#191e22',
    navColor: '#fff',
    navBorder: '1px solid rgb(158 158 158 / 10%)',

    // tabBUtton
    tabButtonColor: '#05050552',
    boderDarkModeButton: '#ffffff2b',
};
