import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Typography, Box, Card, CardContent, Chip, Tooltip } from '@mui/material';
import { Clear, EditNote } from '@mui/icons-material';
import { Link as CusTomLinkIcon } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

import draftsService from '../../../services/draftsService';
import CsLoading from '../../../components/CsLoading';
import { delay } from '../../../utils';
import '../Home.scss';


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

            await delay(1000)

            let creatorID = this.props.userAccount.id

            const res = await draftsService.handlegetAllDrafts(creatorID);

            if (res && res.success === true) {
                let coppyState = { ...this.state }
                coppyState.listDraft = res.data
                coppyState.isLoading = false
                this.setState({ ...coppyState })

            } else {
                console.error("Error fetching drafts:", res);
                this.setState({ isLoading: false });
            }


        } catch (e) {
            this.setState({ loading: false });
        }
    }

    handleDelDraft = async (id) => {

        let res = await draftsService.handleDelDraft(id)
        if (res && res.success === true) {
            toast.success(res.message)
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
                        <CsLoading />

                        :

                        listDraft && listDraft.length > 0 ?
                            listDraft.map((item, index) => {
                                return (
                                    <Card sx={{ marginBottom: '16px', borderRadius: '0px' }} className='draft-item' key={index}>
                                        <CardContent sx={{
                                            ml: '4px'
                                        }} >
                                            <Link to={`/creator/drafts/edit/${item.id}`}>
                                                <Typography sx={{ color: 'primary.sub', fontWeight: 'bold' }} variant='span' >
                                                    {item.draftName ? item.draftName : '[Khuyet Danh]'}
                                                </Typography>
                                            </Link>
                                            <Typography sx={{ color: 'primary.sub', my: '16px' }} className='text-overflow text-overflow-2-lines' variant="body2" component='p'>
                                                {item.content}
                                            </Typography>

                                            {item.bookName ?
                                                <Link to={`/creator/book/${item.bookID}/chapters/`}>
                                                    <Chip
                                                        className="text-white"
                                                        label={item.bookName}
                                                        icon={<CusTomLinkIcon />}
                                                        color="secondary"
                                                        size="small"
                                                        variant="outlined"
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
                                                    <Link to={`/creator/drafts/edit/${item.id}`} className="draft-link-edit" >
                                                        <IconButton>
                                                            <Tooltip title="Chỉnh Sửa">
                                                                <EditNote
                                                                    sx={{
                                                                        color: 'primary.sub',
                                                                    }} />
                                                            </Tooltip>
                                                        </IconButton>
                                                    </Link>

                                                    <span onClick={() => this.handleDelDraft(item.id)}>
                                                        <IconButton>
                                                            <Tooltip title="Xóa">
                                                                <Clear
                                                                    sx={{ color: 'primary.sub', }} />
                                                            </Tooltip>
                                                        </IconButton>
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
                                    <Typography sx={{ color: 'primary.sub', textAlign: "center", width: '100%' }} variant='body2' component={'p'} >
                                        Không có bản thảo nào
                                    </Typography>
                                </CardContent>
                            </Card >
                }
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        userAccount: state.user.userInfo.account
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Draft);
