import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Box, Typography, Card, CardContent, Checkbox, FormControlLabel, TextField, InputLabel, Button } from '@mui/material';

import booksService from '../../../services/booksService';
import SelectCateBook from './SelectCateBook'

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
        this.handleGetCateGoRy()
        this.handleGetAllTag()
    }

    handleGetCateGoRy = async () => {
        try {
            let coppyState = { ...this.state.arrCategory }
            let res = await booksService.handleGetCateGoRy();
            coppyState = res.data
            this.setState({
                arrCategory: coppyState
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    handleGetAllTag = async () => {
        try {
            let typeTags = await booksService.handleGetAllTag();
            let data = typeTags.data

            console.log("typeTags", typeTags);

            let cateState = ['WORLD', 'SCHOOL', 'POETRY', 'CHARACTER']

            const result = cateState.reduce((acc, type) => {
                const items = data.filter(item => item.type === type);
                acc[type] = items;
                return acc;
            }, {});

            this.setState(result);
        } catch (error) {
            console.log(error.message);
        }
    }

    handelInputVale = (e, id) => {
        let coppyState = { ...this.state }
        coppyState.newBook[id] = e.target.value
        this.setState({ ...coppyState })
    }

    handelAdd = async () => {

        let isValid = this.isValid()

        if (!isValid) {
            return false
        }

        if (this.state.checkBox) {
            return toast.error('Vui Lòng Đồng ý Với Chính Sách  !!')
        }

        let creatorID = this.props.userAccount.id

        let newBook = {
            ...this.state.newBook, creatorID
        }
        let data = await booksService.handleAddBook(newBook);

        console.log(data);

        if (data && data.success === true) {

            toast.success(data.message);

            this.props.history.push('/creator/books')

        } else {
            toast.error(data.message);
        }

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
                                <InputLabel className="lable-input">Tên Truyện</InputLabel>
                                <TextField
                                    className="bookDescription"
                                    sx={{
                                        backgroundColor: 'primary.main',
                                    }}
                                    hiddenLabel id="namebook"
                                    placeholder='Viết hoa chữ đầu mỗi từ: Giống Như Thế Này'
                                    variant="outlined" color="secondary"
                                    size="small" fullWidth
                                    value={name}
                                    onChange={(e) => this.handelInputVale(e, 'name')}
                                />
                            </Box>

                            <Box sx={{ mb: '16px' }} >
                                <InputLabel id="content" className="lable-input" >Giới thiệu</InputLabel>

                                <TextField
                                    className='bookDescription'
                                    fullWidth hiddenLabel
                                    value={content}
                                    color="secondary"
                                    sx={{ backgroundColor: 'primary.main', }}
                                    multiline
                                    minRows={6}
                                    placeholder='Tóm tắt cho truyện không nên quá dài mà nên ngắn gọn, Tập trung, thú vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không. Tối đa 700 từ'
                                    id="input-content" size="small"
                                    onChange={(e) => this.handelInputVale(e, 'content')}
                                />

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

                            <Button
                                fullWidth
                                onClick={() => this.handelAdd()}
                                variant="contained" color='secondary'
                            >
                                Thêm Mới
                            </Button>

                        </form>

                    </CardContent>
                </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);