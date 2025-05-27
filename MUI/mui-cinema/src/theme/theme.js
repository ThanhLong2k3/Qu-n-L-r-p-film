import { createTheme } from '@mui/material/styles';
import lightTheme from './light';
import darkTheme from './dark';
import MuiButtonOverrides from './components/button';
import MuiInputLabelOverrides from './components/InputlLable';
import MuiOutlinedInputOverrides from './components/OutlinedInput';
import MuiProductCardOverrides from './components/card';

const theme = createTheme({
  colorSchemes: {
    light: lightTheme,
    dark: darkTheme,
  },
  components: {
    MuiButton: MuiButtonOverrides,
    MuiInputLabel: {
      styleOverrides: MuiInputLabelOverrides,
    },
    MuiOutlinedInput: {
      styleOverrides: MuiOutlinedInputOverrides,
    },
    MuiCard: MuiProductCardOverrides,
  },
});

export default theme;
