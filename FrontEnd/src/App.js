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

function App() {
    return (
        <>
            {/* redux */}
            <Provider store={store}>
                <ThemeWrapper>
                    <GlobalStyle />
                    <BrowserRouter>
                        <RootNav />
                        <AppRoute />
                        <Footer />
                    </BrowserRouter>
                </ThemeWrapper>
            </Provider>
        </>
    );
}

export default App;
