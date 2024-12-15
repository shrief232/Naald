import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ThemeToggleContext = createContext();

const ToggleProvider = ({ children }) => {
  
  const getInitialTheme = () => localStorage.getItem('themeMode') || 'dark';
  
  const [mode, setMode] = useState(getInitialTheme);

 
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#07100b' : '#bc9679',
      },
    },
  });

  return (
    <ThemeToggleContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

// Custom hook to use theme context
export const useThemeToggle = () => useContext(ThemeToggleContext);

export default ToggleProvider;
