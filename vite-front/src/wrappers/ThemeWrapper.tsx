import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'style/theme';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { RootState } from 'store/appSlice';

interface ThemeWrapperProps {
    children: ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
    const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;
