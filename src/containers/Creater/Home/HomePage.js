import React from "react";

import { CardContent, Card, ListItem, List, ListItemButton, Box, Typography } from "@mui/material";
import { RadioButtonUnchecked } from '@mui/icons-material';
import { NavLink } from "react-router-dom";
import './HomePage.scss'


class HomeCreaterPage extends React.Component {
    render() {
        return (
            <>
                <Card >
                    <CardContent >
                        <Typography variant="h6" component="p" sx={{
                            color: 'primary.sub',
                        }}>
                            Tin Tuc Moi

                        </Typography>

                        <Box>
                            <List>
                                <ListItem disablePadding>
                                    <NavLink exact to='/creater/hihi' className='new-item'>
                                        <ListItemButton >
                                            <RadioButtonUnchecked sx={{ mr: '16px', color: 'primary.sub', }}
                                                fontSize="small"
                                            />
                                            <Typography variant="p" component="p" sx={{
                                                color: 'primary.sub',
                                            }}>
                                                Uom Mam Tac Viet
                                            </Typography>
                                        </ListItemButton>
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Box>
                    </CardContent>
                </Card>
            </>
        )
    }
}


export default HomeCreaterPage;