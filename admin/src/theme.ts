import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
export const theme = createMuiTheme({
  // https://material-ui.com/customization/spacing/
  spacing: (factor) => [0, 5, 8, 16, 18, 20, 32, 36][factor],
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
});
