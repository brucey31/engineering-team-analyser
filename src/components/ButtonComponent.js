import '../style/App.css';

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ButtonComponent(props) {  
  const theme = createTheme({
    palette: {
        esgbook: {
            main: '#65E0C8',
            light: '#7FFAE2',
            dark: '#32AD95',
            contrastText: '#006149',
         },
        },
    });  

  return (
    <ThemeProvider theme={theme}>
        <Button 
            variant="contained"
            color="esgbook"
            onClick={() => {
            props.onClick()
            }}
        >
            {props.text}
        </Button>
    </ThemeProvider>
  );
}
