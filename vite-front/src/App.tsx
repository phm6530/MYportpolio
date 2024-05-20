// Rounter
import { BrowserRouter } from 'react-router-dom';
import AppRoute from 'Route/AppRoute';

// redux
import { Provider } from 'react-redux';
import store from 'store/appSlice';

// layOut
import RootNav from 'component/layout/RootNav';
import Footer from 'component/layout/Footer';
import ThemeWrapper from 'wrappers/ThemeWrapper';
import { GlobalStyle } from 'style/theme';

import { ThemeProvider } from '@mui/material';
import theme from 'utils/theme';

import { ToastContainer } from 'react-toastify';
import { toastConfig } from 'utils/toast';

import { queryClient } from 'react-query/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import useAddTransition from 'hooks/useAddTransition';

function App(): JSX.Element {
    // 초기 다크모드 트랜지션효과 방지
    useAddTransition();
    return (
        <>
            {/* redux */}
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ThemeWrapper>
                        <ThemeProvider theme={theme}>
                            <GlobalStyle />
                            <BrowserRouter>
                                <RootNav />
                                <AppRoute />
                                <Footer />
                            </BrowserRouter>
                            <ToastContainer {...toastConfig} />
                        </ThemeProvider>
                    </ThemeWrapper>
                </QueryClientProvider>
            </Provider>
        </>
    );
}

export default App;
