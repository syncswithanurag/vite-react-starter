import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../utils/theme';

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
