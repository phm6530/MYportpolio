import { color } from 'framer-motion';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --white-color: rgb(182, 190, 201);
    --text-color: ${({ theme }) => theme.textColor};
    --background-color: ${({ theme }) => theme.backgroundColor};
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

    tabCnt: 'rgb(102, 179, 255)',
};

export const darkTheme = {
    textColor: '#FFF',
    backgroundColor: '#0f1214',
    asdf: '#454545',
    descriptionColor: '#c9c9c9',

    // input
    SearchBackground: '#000',

    tabCnt: 'rgb(102, 179, 255)',
};
