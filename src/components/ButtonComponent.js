import '../style/App.css';

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ButtonComponent(props) {  
  const theme = createTheme({
    palette: {
        buttonStyle: {
            main: '#008efa',
            light: '#66bbfc',
            dark: '#0080e1',
            contrastText: '#FFFFFF',
         },
        },
    });  

  return (
    <ThemeProvider theme={theme}>
        <Button 
            variant="contained"
            color="buttonStyle"
            onClick={() => {
            props.onClick()
            }}
        >
            {props.text}
        </Button>
    </ThemeProvider>
  );
}
