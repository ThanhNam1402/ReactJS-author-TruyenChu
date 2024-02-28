import Profiles from './Navbar/Profiles';

import { useColorScheme } from '@mui/material/styles';
import { LightMode, DarkMode } from '@mui/icons-material';
import { Box, Button } from '@mui/material';


const HeaderCreater = () => {
    const { mode, setMode } = useColorScheme();

    return (
        <>
            <Box sx={
                {
                    display: 'flex',
                    width: '100%',
                    height: (theme) => theme.creater.navbar,
                    backgroundColor: 'primary.main',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: '20px',
                    borderBottom: '1px solid red'
                }
            }>

                <Button onClick={() => { setMode(mode === 'light' ? 'dark' : 'light'); }} >
                    {mode === 'light' ? <DarkMode color="secondary" /> : <LightMode sx={{ color: 'primary.sub' }} />}
                </Button>

                <Profiles />

            </Box >
        </>
    );

}


export default HeaderCreater;
