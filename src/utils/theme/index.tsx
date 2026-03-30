import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#9c27b0'
    },
    info: {
      main: '#ECECEC'
    },
    warning: {
      main: '#EE9518',
      light: '#FFF2DF'
    },
    success: {
      main: '#00860D',
      light: '#DAFFDD'
    },
    error: {
      main: '#DA0808',
      light: '#FFCECE'
    },
    common: {
      black: '#09090A',
      white: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  shape: {
    borderRadius: 10
  }
});
