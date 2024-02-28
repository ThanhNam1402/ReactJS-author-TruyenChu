import React from 'react';
// import Select from "react-select";
import createrService from '../../../services/createrService';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

import '../Home.scss';

import './draft.scss';

import { Box, Button, Typography, MenuItem, FormControl, Select, TextField } from '@mui/material';



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
                userID: 1
            },
            isUpdate: false,
            isCreate: false,
        }
    }

    componentDidMount() {

        if (this.props.isAdd && this.props.isAdd === true) {
            this.setState({
                isCreate: true
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
            let res = await createrService.handelgetBooks();
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
        console.log(this.props);

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

                <Box sx={{ backgroundColor: 'primary.main', marginBottom: '16px' }} className='afters'>
                    <textarea className="bookDescription draft-note" id='content' rows="20"
                        placeholder='hi'
                        value={content}
                        onChange={(e) => this.handelInputVale(e, 'content')}
                    >
                    </textarea>
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
                                sx={{
                                    backgroundColor: 'primary.main',
                                }}
                                className='bookDescription'
                                hiddenLabel
                                id="namebook"
                                placeholder='Tên Chương'
                                variant="filled"
                                size="small"
                                fullWidth
                                value={draftName}
                                onChange={(e) => this.handelInputVale(e, 'draftName')}

                            />
                        </Box>



                        <Box sx={{ marginBottom: '16px ' }}  >
                            <FormControl size="small" variant="filled" fullWidth disabled={(idBook ? true : false)}>
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
                            <Button variant="contained" sx={{
                                width: '100%',
                                color: 'primary.main',
                            }}
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

export default AutoSaveAndUpdateDraft;