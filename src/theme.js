import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
    creator: {
        navbar: '64px'
    },

    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#f8f8f8',
                    light: '#fff',
                    sub: '#6e6b7b',
                    contrastText: '#fff',

                },
                secondary: {
                    main: '#9287f9',
                    contrastText: '#fff',
                },
                warning: {
                    main: '#ffab00',
                },
                success: {
                    main: '#4caf50'
                },
                input: {

                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#333643',
                    sub: '#7B91A7',
                    contrastText: '#7B91A7',
                    light: '#fff',
                },
                warning: {
                    main: '#ffff8d',
                },
                secondary: {
                    main: '#9287f9',
                    contrastText: '#333',
                },
            }
        }
    }
});

export default theme;