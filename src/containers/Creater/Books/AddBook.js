import React, { Component } from 'react';
import createrService from '../../../services/createrService';
import SelectCateBook from './SelectCateBook'

import { toast } from 'react-toastify';
import { Box, Typography, Card, CardContent, Checkbox, FormControlLabel, TextField, InputLabel, Button } from '@mui/material';

import '../Home.scss';
import './Book.scss';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            WORLD: [],
            CHARACTER: [],
            POETRY: [],
            SCHOOL: [],
            arrCategory: [],
            checkBox: true,
            isLoading: false,

            newBook: {
                name: '',
                content: '',
                categoryID: '',
                bookWorld: '',
                bookChar: '',
                bookSchool: '',
                bookPoetry: '',
            }
        }
    }

    componentDidMount() {
        this.handelGetCateGoRy()
        this.handelGetAllCode()
    }

    handelGetCateGoRy = async () => {
        let coppyState = { ...this.state.arrCategory }
        let cate = await createrService.handelGetCateGoRy();
        coppyState = cate.data.data
        this.setState({
            arrCategory: coppyState
        })
    }

    handelGetAllCode = async () => {

        let cate = await createrService.handelGetAllCode();
        let data = cate.data.data

        let cateState = ['WORLD', 'SCHOOL', 'POETRY', 'CHARACTER']

        const result = cateState.reduce((acc, type) => {
            const items = data.filter(item => item.type === type);
            acc[type] = items;
            return acc;
        }, {});

        this.setState(result);

    }

    handelInputVale = (e, id) => {
        let coppyState = { ...this.state }
        coppyState.newBook[id] = e.target.value
        this.setState({ ...coppyState })
    }

    handelAdd = async () => {

        this.setState({ isLoading: true })

        let isValid = this.isValid()

        if (!isValid) {
            this.setState({ isLoading: false })
            return false
        }

        if (this.state.checkBox) {
            this.setState({ isLoading: false })
            return toast.error('Vui Lòng Đồng ý Với Chính Sách  !!')

        }

        let newBook = this.state.newBook

        let data = await createrService.handelAddBook(newBook);

        if (data && data.EC === 0) {
            toast.success(data.EM);
        } else {
            toast.error(data.EM);
        }

        this.setState({ isLoading: false })

        this.props.history.push('/creater/books')

    }

    handelCheckBox = () => {
        this.setState({
            checkBox: !this.state.checkBox
        })
    }

    isValid = () => {
        let isValided = true
        let arrBook = ['name', 'content', 'categoryID', 'bookWorld', 'bookChar', 'bookSchool', 'bookPoetry']

        for (let i = 0; i < arrBook.length; i++) {
            if (!this.state.newBook[arrBook[i]]) {
                isValided = false;
                toast.error('Thiếu Dữ Liệu ' + arrBook[i])
                break;
            }
        }

        return isValided;
    }

    render() {
        let { name, content, arrCategory, WORLD, CHARACTER, SCHOOL, POETRY } = this.state;

        return (
            <>
                <Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: '500', color: 'primary.sub' }} variant='h4'>
                        Thêm truyện mới
                    </Typography>
                    <Typography sx={{ color: 'primary.sub', marginBottom: '24px' }} variant='p' component='p'>
                        Bắt đầu sáng tạo thế giới của riêng bạn
                    </Typography>
                </Box>
                <Card >
                    <CardContent >
                        <form>
                            <Box sx={{ mb: '16px' }} >
                                <InputLabel id="namebook" className="lable-input">Tên Truyện</InputLabel>
                                <TextField
                                    sx={{
                                        backgroundColor: 'primary.main',
                                    }}
                                    className='namebook'
                                    hiddenLabel
                                    id="namebook"
                                    placeholder='Viết hoa chữ đầu mỗi từ: Giống Như Thế Này'
                                    variant="filled"
                                    size="small"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => this.handelInputVale(e, 'name')}

                                />
                            </Box>

                            <Box sx={{ mb: '16px' }} >
                                <InputLabel id="content" className="lable-input" >Giới thiệu</InputLabel>
                                <textarea rows="6"
                                    className="bookDescription"
                                    id='content'
                                    value={content}
                                    onChange={(e) => this.handelInputVale(e, 'content')}
                                    placeholder='Tóm tắt cho truyện không nên quá dài mà nên ngắn gọn, Tập trung, thú vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không. Tối đa 700 từ'
                                >
                                </textarea>

                            </Box>

                            <SelectCateBook
                                cateValue={arrCategory}
                                labelName='Thể Loại'
                                keyInput={'categoryID'}
                                handelInputVale={this.handelInputVale}
                            />
                            <SelectCateBook
                                cateValue={CHARACTER}
                                labelName='Tính Cách Nhân Vật'
                                keyInput={'bookChar'}
                                handelInputVale={this.handelInputVale}
                            />
                            <SelectCateBook
                                cateValue={WORLD}
                                labelName='Bối Cảnh Thế Giới'
                                keyInput={'bookWorld'}
                                handelInputVale={this.handelInputVale}
                            />
                            <SelectCateBook
                                cateValue={SCHOOL}
                                labelName='Lưu Phái'
                                keyInput={'bookSchool'}
                                handelInputVale={this.handelInputVale}
                            />
                            <SelectCateBook
                                cateValue={POETRY}
                                labelName='Thị Giác'
                                keyInput={'bookPoetry'}
                                handelInputVale={this.handelInputVale}
                            />

                            <Box sx={{ mb: '16px' }}>
                                <FormControlLabel control={<Checkbox onClick={() => this.handelCheckBox()} />} label="Đồng Ý Với Chính Sách" />
                            </Box>

                            <Button variant="contained" fullWidth
                                sx={{
                                    backgroundColor: 'secondary.main'
                                }}
                                onClick={() => this.handelAdd()}
                            >
                                {this.state.isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Thêm Mới"}
                            </Button>

                        </form>

                    </CardContent>
                </Card>
            </>
        )
    }
}

export default AddBook