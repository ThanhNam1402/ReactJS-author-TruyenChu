

import React from 'react';
import createrService from '../../../services/createrService';

import { Box, Button } from '@mui/material';

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

    // chỉnh sửa nội dung and name 

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

                <Box sx={{ backgroundColor: 'primary.main', marginBottom: '16px' }} className='afters'>

                    <textarea className="bookDescription draft-note" id='content' rows="20"
                        placeholder='hi'
                        value={content}
                        onChange={(e) => this.handelInputVale(e, 'content')}
                    >
                    </textarea>
                </Box>

                <Box sx={{ marginBottom: '16px ' }}>
                    <input type="text" className="form-control bookDescription"
                        placeholder='Ten Chuong'
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