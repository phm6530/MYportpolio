import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ReactQuery } from 'lib/lib';
import { queryClient } from 'react-query/queryClient';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'lib/theme';
// 전역 쿼리 설정

const { QueryClientProvider } = ReactQuery;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </ChakraProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
