import React from 'react';
// import Select from "react-select";
import createrService from '../../../services/createrService';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { connect } from 'react-redux';

import '../Home.scss';
import './draft.scss';

import { Box, Button, Typography, MenuItem, FormControl, Select, TextField } from '@mui/material';
// import { Draft } from '../../../components/CsDraft';



class AutoSaveAndUpdateDraft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idBook: '',
            listBook: [],
            draft: {
                bookID: 0,
                content: '',
                draftName: '',
                draftLength: 0,
                id: "",
                userID: ''
            },
            isUpdate: false,
            isCreate: false,
        }
    }

    componentDidMount() {

        if (this.props.isAdd && this.props.isAdd === true) {
            this.setState({
                isCreate: true,
                draft: {
                    userID: this.props.creatorID
                }
            })
        }

        if (this.props.isUpdate && this.props.isUpdate === true) {
            this.setState({
                isUpdate: true
            })
        }

        this.handelGetBook();

    }

    // XONG
    handelGetBook = async () => {

        try {

            let creatorID = this.props.creatorID
            console.log("creatorID", creatorID);
            let res = await createrService.handelgetBooks(creatorID);
            if (res && res.EC === 0) {
                let coppyState = { ...this.state }
                coppyState.listBook = res.data
                this.setState({ ...coppyState })
            }
        } catch (error) {
            console.log(error);
        }

    }

    async componentDidUpdate(prevProps) {
        if (this.props.idBook && this.props.idBook !== this.state.idBook) {
            let coppyState = { ...this.state }
            coppyState.draft.bookID = this.props.idBook
            coppyState.idBook = this.props.idBook
            this.setState({ ...coppyState });

        }

        // XONG
        // CHỈNH SỬA , SETSTATE KHI CẬP NHẬT DRAFT 
        if (prevProps.dataUpdate !== this.props.dataUpdate) {
            let { dataUpdate } = this.props

            this.setState({
                draft: {
                    content: dataUpdate.content,
                    draftLength: dataUpdate.content.split(" ").length,
                    draftName: dataUpdate.draftName,
                    id: dataUpdate.id,
                    bookID: dataUpdate.bookID,
                    userID: 1
                }
            })
        }

        // XONG 
        if (this.state.isCreate === true && this.state.draft.draftLength > 7) {
            this.handelCreateDraft()
            this.setState({
                isUpdate: true,
                isCreate: false,
            })
        }

        // XONG 
        if (this.state.isUpdate === true && this.state.draft.draftLength > 10) {
            this.handelAutoSaveDraft()
        }

    }

    // XONG , TẠO DRAFT
    handelCreateDraft = async () => {
        if (this.state.draft.draftLength > 6) {

            let draft = this.state.draft
            let data = await createrService.handelCreateDrafft(draft)


            if (data && data.EC !== 0) {
                return toast.error(data.message)
            }

            if (data && data.EC === 0) {
                let coppyState = { ...this.state }
                coppyState.draft.id = data.data.id
                this.setState({ ...coppyState })
                console.log('state', this.state);
            }
        }
    }

    // XONG , AUTOSAVE 
    handelAutoSaveDraft = debounce(async () => {
        let draft = this.state.draft
        console.log(draft);
        await createrService.handelAutoSaveDraft(draft)
    }, 300)


    // XONG 
    handelInputVale = (e, id) => {

        let coppyState = { ...this.state }
        coppyState.draft[id] = e.target.value
        if (id === 'content') {
            coppyState.draft.draftLength = coppyState.draft.content.split(" ").length
        }
        this.setState({ ...coppyState })

    }


    // XUẤT BẢN 
    handelPublishDraft = async () => {

        if (this.state.draft.draftName === null || this.state.draft.draftName === '') {
            toast.error('Vui Lòng Đặt Tên Chương')
            return false
        }
        if (this.state.draft.bookID === null || this.state.draft.bookID === '') {
            toast.error('Vui Lòng Chon Truyện Để Xuất Bản')
            return false
        }
        if (this.state.draft.content === null || this.state.draft.content === '') {
            toast.error('Vui Lòng Thêm Nội Dung')
            return false
        }

        try {
            let draftById = this.state.draft

            let res = await createrService.handelUpdateDraftByID(draftById)

            if (res && res.EC === 0) {
                toast.success(res.EM)
            }

        } catch (error) {
            console.log(error);
        }

    }

    render() {
        let { draftLength, draftName, content, bookID } = this.state.draft
        let { isUpdate, listBook, idBook } = this.state

        return (
            <>
                <Box sx={{ backgroundColor: 'primary.main', marginBottom: '16px' }}>
                    <TextField
                        fullWidth
                        hiddenLabel
                        multiline
                        minRows={18}
                        margin="normal"
                        size="small"
                        id="input-content"
                        value={content}
                        color="secondary"
                        onChange={(e) => this.handelInputVale(e, 'content')}
                    />
                </Box>


                <Box sx={{ marginBottom: '16px', color: 'primary.sub' }} >
                    <Typography variant='span'>
                        {draftLength > 7 ? 'Đã Lưu' : 'Tự Động Lưu'} :
                    </Typography>
                    <Typography sx={{ color: 'primary.sub' }} variant='span'>
                        {draftLength} Từ
                    </Typography>
                </Box>

                {isUpdate || (idBook && idBook !== '') ?
                    <>
                        <Box sx={{ marginBottom: '16px ' }}>
                            <TextField
                                hiddenLabel id="namebook"
                                placeholder='Tên Chương'
                                size="small" fullWidth
                                value={draftName}
                                color="secondary"
                                onChange={(e) => this.handelInputVale(e, 'draftName')}

                            />
                        </Box>


                        <Box sx={{ marginBottom: '16px ' }}  >
                            <FormControl color="secondary" size="small" fullWidth disabled={(idBook ? true : false)}>
                                <Select
                                    value={idBook && idBook !== '' ? idBook : bookID}
                                    onChange={(e) => this.handelInputVale(e, 'bookID')}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >

                                    <MenuItem value="0" disabled><em> -- Vui lòng chọn truyện muốn đăng --</em> </MenuItem>
                                    {listBook && listBook.length > 0 &&
                                        listBook.map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item.id} >{item.name ? item.name : '[Khuyết Danh]'}</MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </FormControl>

                        </Box>

                        <Box sx={{ marginBottom: '16px ' }}>
                            <Button fullWidth variant="contained"
                                color="secondary"
                                onClick={() => this.handelPublishDraft()}>Xuất Bản
                            </Button>
                        </Box>
                    </>

                    :

                    ""

                }

            </>
        )

    }

}

const mapStateToProps = state => {
    return {
        creatorID: state.user.userInfo.account.id

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoSaveAndUpdateDraft);
