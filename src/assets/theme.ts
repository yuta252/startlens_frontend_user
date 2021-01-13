import { createMuiTheme } from "@material-ui/core/styles";
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';

import './Style.module.css';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500]
        },
        secondary: {
            main: indigo[500]
        }
    },
    typography: {
        fontFamily: '"Noto Sans JP", Roboto, sans-serif',
    },
});