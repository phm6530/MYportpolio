import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --white-color: rgb(182, 190, 201);
    --text-color: ${({ theme }) => theme.textColor};
    --background-color: ${({ theme }) => theme.backgroundColor};
    --popup-background-color: ${({ theme }) => theme.BackgroundColor_Type_1};
    --error-color: #f34141;
  }

  body {
    color: var(--text-color);
    background: var(--background-color);
    transition: background .5s ease;
  }
`;

export const lightTheme = {
    textColor: '#333',
    backgroundColor: '#FFF',
    asdf: '#ebe5e5',
    descriptionColor: '#888c94',

    // input
    SearchBackground: '#fbfbfb',
    BackgroundColor_Type_1: '#eef8ff',

    // errorColor

    tabCnt: 'rgb(102, 179, 255)',
};

export const darkTheme = {
    textColor: '#FFF',
    backgroundColor: '#0f1214',
    asdf: '#454545',
    descriptionColor: '#c9c9c9',

    // input
    SearchBackground: '#161b24',

    BackgroundColor_Type_1: '#353b3f',

    tabCnt: 'rgb(102, 179, 255)',
};
