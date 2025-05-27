import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      light: '#f7e0b8',
      main: '#f0c78d',
      dark: '#d9a14e',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#f1f1f1',
      secondary: '#d1d1d1',
    },
    divider: '#3b3b3b',
  },
});

export default lightTheme;
