import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { colors, colorsDark } from '../constants/colors.js';

const ThemeContext = createContext(colors);

export const ThemeProvider = ({ children }) => {
  const theme = useColorScheme();
  const themeColors = theme === 'dark' ? colorsDark : colors;
  return (
    <ThemeContext.Provider value={themeColors}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);