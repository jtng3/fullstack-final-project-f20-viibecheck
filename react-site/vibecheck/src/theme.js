import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6888BE',
      main: '#4470AD',
      dark: '#000070',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6090',
      main: '#6888BE',
      dark: '#b0003a',
      contrastText: '#000',
    },
  },
});

export default theme;