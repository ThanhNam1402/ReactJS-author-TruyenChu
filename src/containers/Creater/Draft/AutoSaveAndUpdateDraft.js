import React from 'react';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { Box, Button, Typography, MenuItem, FormControl, Select, TextField } from '@mui/material';


import draftsService from '../../../services/draftsService';
import booksService from '../../../services/booksService';
import './draft.scss';
import CsLoading from '../../../components/CsLoading';
import { delay } from '../../../utils';


class AutoSaveAndUpdateDraft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idBook: '',
            listBook: [],
            draft: {
                bookID: "",
                content: "",
                draftName: "",
                draftLength: 0,
                id: "",
            },
            isUpdate: false,
            isCreate: false,
            isLoading: false
        }
    }


    // draft: {
    //     userID: this.props.userAccount.id
    // }
    async componentDidMount() {

        if (this.props.isAdd && this.props.isAdd === true) {
            this.setState({
                isCreate: true,
            })
        }

        if (this.props.isUpdate && this.props.isUpdate === true) {
            this.setState({
                isUpdate: true
            })
        }

        this.handelGetBook();

    }

    // get book 
    handelGetBook = async () => {
        try {
            this.setState({ isLoading: true })
            await delay(1000);

            let creatorID = this.props.userAccount.id

            let res = await booksService.handlegetAllBooks(creatorID);
            if (res && res.success === true) {
                let coppyState = { ...this.state }
                coppyState.listBook = res.data

                this.setState({ ...coppyState, isLoading: false })
            }
        } catch (error) {
            console.log(error);
        }

    }


    // get id book 
    async componentDidUpdate(prevProps) {
        if (this.props.idBook && this.props.idBook !== this.state.idBook) {
            let coppyState = { ...this.state }
            coppyState.draft.bookID = this.props.idBook
            coppyState.idBook = this.props.idBook
            this.setState({ ...coppyState });

        }

        // CHỈNH SỬA , SETSTATE KHI CẬP NHẬT DRAFT 
        if (prevProps.dataUpdate !== this.props.dataUpdate) {
            this.setState({
                isLoading: true
            })
            await delay(1000)

            let { dataUpdate } = this.props

            this.setState({
                draft: {
                    content: dataUpdate.content,
                    draftLength: dataUpdate.content.split(" ").length,
                    draftName: dataUpdate.draftName,
                    id: dataUpdate.id,
                    bookID: dataUpdate.bookID ? dataUpdate.bookID : "",
                    userID: dataUpdate.userID
                }
            })
            this.setState({
                isLoading: false
            })
        }

        //  create a new draft
        if (this.state.isCreate === true && this.state.draft.draftLength > 7) {

            console.log("this.props mount ", this.props);


            this.handelCreateDraft()
            this.setState({
                isUpdate: true,
                isCreate: false,
            })
        }

        // XONG, auto save khi lenght > 10 và không thể xóa hết các các chữ trong draft 
        if (this.state.isUpdate === true && this.state.draft.draftLength > 10) {
            this.handleUpdateDraft()
        }

    }

    // create draft 
    handelCreateDraft = async () => {
        if (this.state.draft.draftLength > 6) {

            let userID = this.props.userAccount.id;
            let newDraft = { ...this.state.draft, userID }

            let data = await draftsService.handleAddDraft(newDraft)


            if (data && data.success !== true) {
                return toast.error(data.message)
            }

            if (data && data.success === true) {
                let coppyState = { ...this.state }
                coppyState.draft.id = data.data.id
                this.setState({ ...coppyState })
                console.log('state', this.state);
            }
        }
    }

    // auto save draft 
    handleUpdateDraft = debounce(async () => {
        let draft = this.state.draft
        console.log(draft);
        let res = await draftsService.handleUpdateDraft(draft)

        console.log(res);
    }, 300)

    // input value 
    handelInputVale = (e, id) => {

        let coppyState = { ...this.state }
        coppyState.draft[id] = e.target.value
        if (id === 'content') {
            coppyState.draft.draftLength = coppyState.draft.content.split(" ").length
        }
        this.setState({ ...coppyState })

    }

    // publish draft 
    handelPublicDraft = async () => {

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

            let res = await draftsService.handlePublish(draftById)

            if (res && res.success === true) {
                toast.success(res.message)
            }

        } catch (error) {
            console.log(error);
        }

    }

    render() {
        let { draftLength, draftName, content, bookID } = this.state.draft
        let { isUpdate, listBook, idBook, isLoading } = this.state

        return (
            <>
                {isLoading ?
                    <CsLoading />
                    :
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
                                        hiddenLabel
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
                                            value={idBook && idBook !== 0 ? idBook : bookID}
                                            onChange={(e) => this.handelInputVale(e, 'bookID')}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            color="secondary"

                                        >

                                            <MenuItem value="" disabled><em> -- Vui lòng chọn truyện muốn đăng --</em> </MenuItem>
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
                                        onClick={() => this.handelPublicDraft()}>Xuất Bản
                                    </Button>
                                </Box>
                            </>

                            :

                            ""

                        }
                    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(AutoSaveAndUpdateDraft);
