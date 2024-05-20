import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'style/theme';
import { useSelector } from 'react-redux';

const ThemeWrapper = ({ children }) => {
    const { darkMode } = useSelector(state => state.darkModeSlice);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;
