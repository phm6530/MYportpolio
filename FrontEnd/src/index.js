import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ReactQuery } from 'lib/lib';
import './index.css';

import { QueryCache } from '@tanstack/react-query';

const { QueryClient, QueryClientProvider } = ReactQuery;

// 전역 쿼리 설정
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            onError: error => {
                console.log(error);
            },
        },
        mutations: {
            onError: error => {
                console.log(error);
            },
        },
    },
    queryCache: new QueryCache({
        onError: error => {
            console.log('에러가떠야함');
            console.log(error.message);
        },
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
