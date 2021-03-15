import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  color: {
    primary: '#00B2BF',
    secondary: '#03A9F4',
    error: '#607D8B',
    textColor: '#FFFFFF',
    defaultTextColor: '#0000000',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    textColor: '#FFFFFF',
    border: '#CCCCCC',
  },
});

export default theme;
