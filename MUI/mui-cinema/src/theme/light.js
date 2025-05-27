import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#67e5a1',
      main: '#35ac75',
      dark: '#2a7b56',
    },
    background: {
      paper: '#ffffff', 
    },
    text: {
      primary: '#000000', 
    },
    divider: '#e0e0e0',
  },
});

export default darkTheme;
