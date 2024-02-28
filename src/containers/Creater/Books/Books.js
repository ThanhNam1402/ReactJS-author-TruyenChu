import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Moment from 'moment';
import createrService from '../../../services/createrService';

// import ModalConfirm from '../../../components/ModalConfirm';

import { toast } from 'react-toastify';
import { CardContent, Typography, Box, Grid, Tooltip } from '@mui/material';
import { Button as ButtonMUI } from '@mui/material';
import { FormatListNumbered, AddCircleOutline, Edit, Delete } from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Book.scss'

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBook: [],
            openModel: false

        }
    }

    async componentDidMount() {
        this.handelGetBook()

    }


    handelGetBook = async () => {

        try {
            let res = await createrService.handelgetBooks();

            if (res && res.EC === 0) {

                let coppyState = { ...this.state }
                coppyState['listBook'] = res.data
                this.setState({ ...coppyState })
            }
        } catch (error) {
            console.log(error);
        }
    }


    handleDelBook = async (id) => {
        console.log(id);

        try {
            let res = await createrService.handelDelBook(id)

            console.log(res);

            if (res.EC === 0) {
                this.handelGetBook()
                toast.success(res.EM)
            }



        } catch (error) {
            console.log(error);
        }
    }



    render() {

        let { collapseID, listBook, openModel } = this.state

        return (
            <>
                <Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: '500', color: 'primary.sub' }} variant='h4'>
                        Truyện của tôi
                    </Typography>
                    <Typography sx={{ color: 'primary.sub', marginBottom: '24px' }} variant='p' component='p'>
                        Danh sách các truyện bạn đã đăng
                    </Typography>
                </Box>


                <Grid container spacing={2}>
                    {listBook && listBook.length > 0 &&
                        listBook.map((item, index) => {
                            return (
                                <Grid item xs={6} key={index}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >


                                            <Box className='book-info'
                                                sx={{
                                                    display: 'flex', alignItems: 'start',
                                                    width: '100%',
                                                    p: '8px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <img
                                                    src="https://i.pinimg.com/564x/d1/41/46/d141468babca1416a378c62f49d4aa38.jpg"
                                                    className="img-book"
                                                    alt="namcute"
                                                />
                                                <div>
                                                    <Typography sx={{ color: 'primary.sub', fontSize: '16px', marginBottom: '8px', fontWeight: 'bold' }} variant='p' component='p' >
                                                        {item.name}
                                                    </Typography>

                                                    <Typography sx={{ color: 'primary.sub', fontSize: '14px' }} className='date' variant='span' component='span' >
                                                        Ngày Thêm Truyện : {Moment(item.createdAt).format('DD-MM-YYYY')}
                                                    </Typography>
                                                </div>
                                            </Box>
                                        </AccordionSummary>
                                        <CardContent >

                                            <Typography sx={{ color: 'warning.main', fontSize: '14px' }} variant='span' component='span' >
                                                Tình Trạng :  {item.status === 0 ? 'Chưa xuất bản' : 'Đang ra'}
                                            </Typography>

                                            <p>
                                                Opps! Truyện này của bạn chưa có chương nào. Ấn vào dấu + bên dưới để bắt đầu thêm chương cho truyện thôi nào, nếu chưa biết phải viết gì thì ghé qua mục Kiến Thức Cơ Bản để tham khảo nhé
                                            </p>

                                            <hr />

                                            <Box className="menu-icon" sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <div>
                                                    <Tooltip title="Thêm Chương">
                                                        <Link className="menu-icon-item"
                                                            to={{
                                                                pathname: "/creater/drafts/new",
                                                                state: { idBook: item.id }
                                                            }}
                                                        >
                                                            <AddCircleOutline sx={{ color: 'primary.sub' }} />
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="Chỉnh Sửa">
                                                        <Link className="menu-icon-item"
                                                            to={`/creater/book/edit/${item.id}`}
                                                        >
                                                            <Edit sx={{ color: 'primary.sub' }} />
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="Danh Sách Chương">
                                                        <Link className="menu-icon-item"
                                                            to={`/creater/book/${item.id}/chapters`}
                                                        >
                                                            <FormatListNumbered sx={{ color: 'primary.sub' }} />
                                                        </Link>
                                                    </Tooltip>

                                                </div>


                                                <Tooltip title="Xóa">
                                                    <ButtonMUI
                                                        variant="outlined" onClick={() => this.handleDelBook(item.id)} sx={{
                                                            backgroundColor: 'primary.sub',
                                                            "&:hover": {
                                                                backgroundColor: "red"
                                                            }
                                                        }} >
                                                        <Delete sx={{
                                                            color: 'primary.main'
                                                        }} />
                                                    </ButtonMUI>
                                                </Tooltip>


                                            </Box>

                                        </CardContent>
                                    </Accordion>
                                </Grid>
                            )
                        })
                    }

                </Grid >
            </>

        )

    }

}

export default Books