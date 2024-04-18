import React, { Component } from 'react';

import createrService from '../../../services/createrService';
import moment from 'moment';

import { Card, CardContent, Typography, Box } from '@mui/material';

class DetailTopic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topic: {}
        }

    }


    async componentDidMount() {
        try {
            let slug = this.props.match.params.slug

            console.log(slug);

            let res = await createrService.handelgetTopicbBySlug(slug);

            console.log(res);

            if (res && res.EC === 0) {

                let data = res.data
                console.log(data);

                this.setState({
                    topic: data
                })
            } else {
                console.log('Not foound Book ??? ');
            }

        } catch (error) {
            console.log(error);
        }
    }


    render() {
        console.log(this.state.topic);

        let { topic } = this.state
        return (
            <>

                <Card>
                    <CardContent>
                        <Box sx={{
                            mb: '16px'
                        }}>
                            <Typography variant="h6" component="h6">
                                {topic.name}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: 'primary.contrastText' }} component="span">
                                {moment(topic.createdAt).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>

                        <pre>

                            {topic.content}

                        </pre>


                    </CardContent>

                </Card>
            </>

        );
    }
}


export default DetailTopic;