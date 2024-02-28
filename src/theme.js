import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
    creater: {
        navbar: '64px'
    },

    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#f8f8f8',
                    sub: '#6e6b7b'
                },
                secondary: {
                    main: '#9287f9',
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#333643',
                    sub: '#7B91A7'
                }
            }
        }
    }
});

export default theme;