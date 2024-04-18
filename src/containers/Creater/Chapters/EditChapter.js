

import React from 'react';
import createrService from '../../../services/createrService';

import { Box, Button, InputLabel, TextField } from '@mui/material';

import { toast } from 'react-toastify';

class EditChapter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            draftName: '',
            bookID: ''
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id

        let res = await createrService.handelgetDraftByID(id)
        let data = res.data;

        console.log(res.data);

        this.setState({
            content: data.content,
            draftName: data.draftName,
            bookID: data.bookID
        })
    }


    handelInputVale = (e, id) => {

        let coppyState = { ...this.state }
        coppyState[id] = e.target.value
        this.setState({ ...coppyState })

    }

    handelEditChapter = async () => {
        try {
            let id = this.props.match.params.id
            let data = { ...this.state, id }

            console.log(data);
            let res = await createrService.handelEditChapter(data)

            if (res && res.EC === 0) {
                toast.success(res.EM);

                this.props.history.push(`/creater/book/${this.state.bookID}/chapters`)

            } else {
                toast.error(res.EM);
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {

        let { content, draftName } = this.state;

        console.log(this.props);


        console.log(this.state);
        return (

            <>

                <Box sx={{ backgroundColor: 'primary.main', marginBottom: '16px' }}>

                    <TextField
                        className='bookDescription'
                        fullWidth hiddenLabel
                        color="secondary"
                        sx={{ backgroundColor: 'primary.main', }}
                        multiline
                        minRows={20}
                        placeholder='Tóm tắt cho truyện không nên quá dài mà nên ngắn gọn, Tập trung, thú vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không. Tối đa 700 từ'
                        id="input-content" size="small"
                        onChange={(e) => this.handelInputVale(e, 'content')}
                        value={content}
                    />
                </Box>

                <Box sx={{ marginBottom: '16px ' }}>

                    <InputLabel id="namebook" className="lable-input">Tên Chương</InputLabel>
                    <TextField
                        className='namebook'
                        sx={{ backgroundColor: 'primary.main', }}
                        hiddenLabel id="namebook"
                        placeholder='Viết hoa chữ đầu mỗi từ: Giống Như Thế Này'
                        variant="outlined" color="secondary"
                        size="small" fullWidth
                        value={draftName}
                        onChange={(e) => this.handelInputVale(e, 'draftName')}
                    />
                </Box>

                <Button variant="contained"
                    onClick={() => this.handelEditChapter()}
                    sx={{
                        width: '100%',
                        backgroundColor: 'secondary.main'
                    }}>Lưu Lại</Button>
            </>
        )
    }

}

export default EditChapter 