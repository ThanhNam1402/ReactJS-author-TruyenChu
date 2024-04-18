import React from "react";
import moment from "moment";

import { CardContent, Card, ListItem, List, ListItemButton, Box, Typography } from "@mui/material";
import { RadioButtonUnchecked } from '@mui/icons-material';
import { Link } from "react-router-dom";

import createrService from "../../../services/createrService";
import './HomePage.scss'


class HomeCreaterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listTopic: [],
        }
    }

    async componentDidMount() {
        try {
            let res = await createrService.handelgetToppic()
            if (res && res.EC === 0) {
                this.setState({
                    listTopic: res.data ? res.data : []
                })
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        let { listTopic } = this.state;

        return (
            <>
                <Card >
                    <CardContent >
                        <Typography variant="h6" component="p" sx={{ color: 'primary.sub' }}>
                            Tin Tức Mới
                        </Typography>

                        <Box>
                            <List>

                                {listTopic && listTopic.length ?
                                    listTopic.map((item, index) => {
                                        return (
                                            <ListItem key={index} disablePadding>
                                                <Link to={`/creater/topic/${item.slug}`} className='new-item'>
                                                    <ListItemButton >
                                                        <RadioButtonUnchecked sx={{ mr: '16px', color: 'primary.sub', }}
                                                            fontSize="small"
                                                        />
                                                        <Typography variant="p" component="p" sx={{
                                                            color: 'warning.main',
                                                            mr: '4px'
                                                        }}>
                                                            {item.name}
                                                        </Typography>

                                                        <Typography variant="overline" display="block" sx={{
                                                            color: 'primary.sub',
                                                        }}>
                                                            {moment(item.createdAt).format('DD-MM-YYYY')}
                                                        </Typography>
                                                    </ListItemButton>
                                                </Link>
                                            </ListItem>
                                        )
                                    })

                                    :

                                    ''
                                }
                            </List>
                        </Box>
                    </CardContent>
                </Card>
            </>
        )
    }
}


export default HomeCreaterPage;