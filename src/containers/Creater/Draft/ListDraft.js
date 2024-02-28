import React, { Component } from 'react';
// import Select from "react-select";
import createrService from '../../../services/createrService';
import Moment from 'moment';
import '../Home.scss';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logoReact.svg';


import { Typography, Box, Card, CardContent, Chip, Button, Tooltip } from '@mui/material';
import { Clear, EditNote } from '@mui/icons-material';
import { Link as CusTomLinkIcon } from "@mui/icons-material";



class Draft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDraft: [],
            isLoading: false

        }
    }

    componentDidMount() {
        this.getDrafts()
    }


    getDrafts = async () => {

        try {

            this.setState({ isLoading: true })
            await new Promise(resolve => setTimeout(resolve, 500));

            const res = await createrService.handelgetDrafts();

            if (res && res.EC === 0) {
                let coppyState = { ...this.state }
                coppyState.listDraft = res.data
                coppyState.isLoading = false
                this.setState({ ...coppyState })

            } else {
                console.error("Error fetching drafts:", res);
                this.setState({ isLoading: false });
            }


        } catch (e) {
            console.log(e);
            this.setState({ loading: false });
        }
    }

    handelDelDraft = async (id) => {
        console.log('handelDelDrafts', id)

        let res = await createrService.handelDelDraft(id)

        if (res && res.EC === 0) {
            toast.success(res.EM)
            this.getDrafts()

        }
    }



    render() {

        let { listDraft, isLoading } = this.state


        return (
            <>
                <Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: '500', color: 'primary.sub' }} variant='h4'>
                        Danh Sách Bản Thảo
                    </Typography>
                    <Typography sx={{ color: 'primary.sub', marginBottom: '24px' }} variant='p' component='p'>
                        Đây là tập hợp danh sách các bản thảo chưa xuất bản của bạn
                    </Typography>
                </Box>
                {
                    isLoading === true ?
                        <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <img src={logo} className="App-logo" alt="logo" />
                            </CardContent>
                        </Card>

                        :

                        listDraft && listDraft.length > 0 ?
                            listDraft.map((item, index) => {
                                return (
                                    <Card sx={{ marginBottom: '16px', borderRadius: '0px' }} className='draft-item' key={index}>
                                        <CardContent sx={{
                                            ml: '4px'
                                        }} >
                                            <Link to={`/creater/drafts/edit/${item.id}`}>
                                                <Typography sx={{ color: 'primary.sub', fontWeight: 'bold' }} variant='span' >
                                                    {item.draftName ? item.draftName : '[Khuyet Danh]'}
                                                </Typography>


                                            </Link>
                                            <Typography sx={{ color: 'primary.sub', my: '16px' }} className='text-overflow text-overflow-2-lines' variant='p' component='p'>
                                                {item.content}
                                            </Typography>

                                            {item["Book.name"] ?
                                                <Link to={`/creater/book/${item["Book.id"]}/chapters/`}>
                                                    <Chip
                                                        className="text-white"
                                                        label={item["Book.name"]}
                                                        icon={<CusTomLinkIcon />}
                                                        color="secondary"
                                                        size="small"

                                                    />
                                                </Link>
                                                : ''

                                            }

                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '16px', fontSize: '12px' }} >
                                                <Typography sx={{ color: 'primary.sub' }} variant='span' >
                                                    {Moment(item.createdAt).format('DD-MM-YYYY')}
                                                </Typography>

                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}>
                                                    <Link to={`/creater/drafts/edit/${item.id}`} className="draft-link-edit" >
                                                        <Tooltip title="Chỉnh Sửa">
                                                            <EditNote
                                                                sx={{
                                                                    color: 'primary.sub',
                                                                }} />
                                                        </Tooltip>
                                                    </Link>

                                                    <span onClick={() => this.handelDelDraft(item.id)}>
                                                        <Tooltip title="Xóa">
                                                            <Clear
                                                                sx={{ color: 'primary.sub', }} />
                                                        </Tooltip>
                                                    </span>

                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card >
                                )
                            })
                            :
                            <Card >
                                <CardContent>
                                    <Typography sx={{ color: 'primary.sub' }} variant='span' >
                                        Tam Chua Co Ban Thao Nao
                                    </Typography>
                                </CardContent>
                            </Card >
                }
            </>
        )
    }
}

export default Draft