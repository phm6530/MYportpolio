// Rounter
import { BrowserRouter } from 'react-router-dom';
import AppRoute from 'Route/AppRoute';

// redux

// layOut
import ThemeWrapper from 'style/ThemeWrapper';
import { GlobalStyle } from 'style/CssinJsTheme';

import { ThemeProvider } from '@mui/material';
import MuiTheme from 'style/MuiTheme';

import { ToastContainer } from 'react-toastify';
import { toastConfig } from 'config/toast';

import { queryClient } from 'react-query/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import useAddTransition from 'hooks/useAddTransition';

function App(): JSX.Element {
    // 초기 다크모드 트랜지션효과 방지
    useAddTransition();
    return (
        <>
            {/* redux */}

            <QueryClientProvider client={queryClient}>
                <ThemeWrapper>
                    <ThemeProvider theme={MuiTheme}>
                        <GlobalStyle />
                        <BrowserRouter>
                            <AppRoute />
                        </BrowserRouter>
                        <ToastContainer {...toastConfig} />
                    </ThemeProvider>
                </ThemeWrapper>
            </QueryClientProvider>
        </>
    );
}

export default App;
