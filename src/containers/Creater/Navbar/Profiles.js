import { Box, Avatar } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { PersonOutline, CreditCard, NotificationsNone } from '@mui/icons-material/';
import Logout from '@mui/icons-material/Logout';

const Profiles = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ px: '20px', py: '5px' }}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/e3/45/c6/e345c66df017074018a75aa911166e96.jpg" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 48,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}

            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonOutline />
                    </ListItemIcon>
                    Cai Dat
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <CreditCard />
                    </ListItemIcon>
                    Thanh Toan
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <NotificationsNone />
                    </ListItemIcon>
                    Thong Bao
                </MenuItem>

                <Divider sx={{
                    mt: '0px !important'
                }} />

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default Profiles;