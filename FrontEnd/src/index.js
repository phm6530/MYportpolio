import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ReactQuery } from 'lib/lib';
import { queryClient } from 'react-query/queryClient';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import theme from 'utils/theme';
import { toastConfig } from 'utils/toast';

// 전역 쿼리 설정
const { QueryClientProvider } = ReactQuery;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <App />
            <ToastContainer {...toastConfig} />
            {/* 에러메세지 */}
        </ThemeProvider>
    </QueryClientProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
