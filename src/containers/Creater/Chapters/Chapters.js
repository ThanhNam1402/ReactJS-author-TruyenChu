


import React from 'react';
import { Link } from 'react-router-dom'
import BookNavigation from '../Books/BookNavigate';
import Moment from 'moment';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { EditNote, Clear } from '@mui/icons-material';

import { toast } from 'react-toastify';


import createrService from '../../../services/createrService';

class Chaters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listChapter: [],
            idBook: ''
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        this.setState({ idBook: id })

        this.handelGetChapters(id)

    }

    handelGetChapters = async (id) => {
        try {
            let res = await createrService.handelgetChapterByBookID(id)

            if (res && res.EC === 0) {
                let data = res.data
                this.setState({ listChapter: data });

            } else {
                console.log('error chapter not found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    handelDelChapter = async (id) => {

        let res = await createrService.handelDelDraft(id)

        if (res && res.EC === 0) {
            toast.success(res.EM)

            this.handelGetChapters(this.state.idBook)

        }
    }


    render() {
        let { listChapter } = this.state

        return (
            <>
                <Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: '500', color: 'primary.sub' }} variant='h4'>
                        Chỉnh Sửa
                    </Typography>
                    <Typography sx={{ color: 'primary.sub', marginBottom: '24px' }} variant='p' component='p'>
                        namcute
                    </Typography>
                </Box>
                <BookNavigation
                    id={this.props.match.params.id}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>So TT</TableCell>
                                <TableCell align="right">Tên Chương</TableCell>
                                <TableCell align="right">Ngày Xuất Bản</TableCell>
                                <TableCell align="right">Thao Tác </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listChapter.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="right">{item.draftName}</TableCell>
                                        <TableCell align="right">{Moment(item.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell align="right"  >


                                            <IconButton>
                                                <Link to={`/creater/books/chapters/edit/${item.id}`} s className="draft-link-edit" >
                                                    <Tooltip title="Chỉnh Sửa">
                                                        <EditNote sx={{ color: 'primary.sub' }} />
                                                    </Tooltip>
                                                </Link>
                                            </IconButton>


                                            <IconButton onClick={() => this.handelDelChapter(item.id)}>
                                                <Tooltip title="Xóa">
                                                    <Clear
                                                        sx={{ color: 'primary.sub', }} />
                                                </Tooltip>
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
}



export default Chaters;