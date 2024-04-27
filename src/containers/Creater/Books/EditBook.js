import React, { Component } from 'react';
import serviceBooks from '../../../services/serviceBooks';
import BookNavigation from './BookNavigate'
import '../Home.scss';

import { toast } from 'react-toastify';

import SelectCateBook from './SelectCateBook';
import { Card, CardContent, Box, Button, Typography, InputLabel, TextField, Grid } from '@mui/material';



class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            WORLD: [],
            CHARACTER: [],
            POETRY: [],
            SCHOOL: [],
            STATE: [],
            arrCategory: [],
            checkBox: true,
            isLoading: true,

            book: {
                name: '',
                content: '',
                categoryID: '',
                bookWorld: '',
                bookChar: '',
                bookSchool: '',
                bookPoetry: '',
                bookState: '',
                thumbnail: ''
            }
        }
    }

    async componentDidMount() {
        try {
            let id = this.props.match.params.id

            let res = await serviceBooks.handelgetBookByID(id);

            if (res && res.EC === 0) {

                let data = res.data


                console.log(data);

                this.setState({
                    book: {
                        bookPoetry: data.poetry,
                        name: data.name,
                        bookSchool: data.school,
                        bookWorld: data.world,
                        bookState: data.state,
                        categoryID: data.categoryID,
                        bookChar: data.character,
                        content: data.content
                    }
                })

                this.handelGetAllTag()
                this.handelGetCateGoRy()

            } else {
                console.log('Not foound Book ??? ');
            }

        } catch (error) {
            console.log(error);
        }
    }

    handelGetAllTag = async () => {

        let cate = await serviceBooks.handelGetAllTag();
        let data = cate.data.data
        let cateState = ['WORLD', 'SCHOOL', 'POETRY', 'CHARACTER', 'STATE']

        const result = cateState.reduce((acc, type) => {
            const items = data.filter(item => item.type === type);
            acc[type] = items;
            return acc;
        }, {});

        this.setState(result);

    }

    handelGetCateGoRy = async () => {
        let coppyState = { ...this.state.arrCategory }
        let cate = await serviceBooks.handelGetCateGoRy();
        coppyState = cate.data.data
        this.setState({
            arrCategory: coppyState
        })

    }

    handelInputVale = (e, id) => {
        let coppyState = { ...this.state }
        coppyState.book[id] = e.target.value
        this.setState({ ...coppyState })
    }


    handelOnchangeInputImg = (e) => {
        const file = e.target.files[0];

        console.log(file);
    }


    handelEditBook = async () => {

        try {
            let id = this.props.match.params.id
            let data = { ...this.state.book, id }
            let res = await serviceBooks.handelEditBookByID(data)

            if (res && res.EC === 0) {
                toast.success(res.EM);
            } else {
                toast.error(res.EM);
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {

        let { WORLD, SCHOOL, POETRY, CHARACTER, STATE, arrCategory } = this.state;
        let { content, name, bookPoetry, bookSchool, bookState, bookChar, bookWorld, categoryID } = this.state.book

        console.log(this.state.book);

        return (
            <>

                <>
                    <Box>
                        <Typography sx={{ fontSize: '20px', fontWeight: '500', color: 'primary.sub' }} variant='h4'>
                            Chỉnh Sửa
                        </Typography>
                        <Typography sx={{ color: 'primary.sub', marginBottom: '24px' }} variant='p' component='p'>
                            {name ? name : ''}
                        </Typography>
                    </Box>
                    <BookNavigation
                        id={this.props.match.params.id}
                    />

                    <Card >
                        <CardContent >

                            <Box sx={{ mb: '16px' }} >
                                <InputLabel id="namebook" className="lable-input">Tên Truyện</InputLabel>
                                <TextField
                                    className='namebook'
                                    sx={{ backgroundColor: 'primary.main', }}
                                    hiddenLabel id="namebook"
                                    placeholder='Viết hoa chữ đầu mỗi từ: Giống Như Thế Này'
                                    variant="outlined" color="secondary"
                                    size="small" fullWidth
                                    value={name}
                                    onChange={(e) => this.handelInputVale(e, 'name')}
                                />
                            </Box>

                            <Box sx={{ mb: '16px' }}>
                                <label htmlFor="content" className="label-form">Giới thiệu</label>
                                <TextField
                                    className='bookDescription'
                                    fullWidth hiddenLabel
                                    color="secondary"
                                    sx={{ backgroundColor: 'primary.main', }}
                                    multiline
                                    minRows={6}
                                    placeholder='Tóm tắt cho truyện không nên quá dài mà nên ngắn gọn, Tập trung, thú vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không. Tối đa 700 từ'
                                    id="input-content" size="small"
                                    onChange={(e) => this.handelInputVale(e, 'content')}
                                    value={content}
                                />
                            </Box>

                            <Grid container sx={{
                                marginBottom: '30px'
                            }} spacing={2}>
                                <Grid item xs={6}>

                                    <SelectCateBook
                                        valueInputDefault={categoryID}
                                        cateValue={arrCategory}
                                        labelName='Thể Loại'
                                        keyInput={'categoryID'}
                                        handelInputVale={this.handelInputVale}
                                    />
                                    <SelectCateBook
                                        valueInputDefault={bookChar}
                                        cateValue={CHARACTER}
                                        labelName='Tính Cách Nhân Vật'
                                        keyInput={'bookChar'}
                                        handelInputVale={this.handelInputVale}
                                    />
                                    <SelectCateBook
                                        valueInputDefault={bookWorld}
                                        cateValue={WORLD}
                                        labelName='Bối Cảnh Thế Giới'
                                        keyInput={'bookWorld'}
                                        handelInputVale={this.handelInputVale}
                                    />
                                    <SelectCateBook
                                        valueInputDefault={bookSchool}
                                        cateValue={SCHOOL}
                                        labelName='Lưu Phái'
                                        keyInput={'bookSchool'}
                                        handelInputVale={this.handelInputVale}
                                    />
                                    <SelectCateBook
                                        valueInputDefault={bookPoetry}
                                        cateValue={POETRY}
                                        labelName='Thị Giác'
                                        keyInput={'bookPoetry'}
                                        handelInputVale={this.handelInputVale}
                                    />
                                    <SelectCateBook
                                        valueInputDefault={bookState}
                                        cateValue={STATE}
                                        labelName='Tinh Trang'
                                        keyInput={'bookState'}
                                        handelInputVale={this.handelInputVale}
                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: "column",
                                        padding: '40px',
                                        border: 1,
                                        borderRadius: '4px'
                                    }}>
                                        <div style={{
                                            width: '200px', height: '300px'
                                        }}>
                                            <img
                                                src="https://i.pinimg.com/564x/d1/41/46/d141468babca1416a378c62f49d4aa38.jpg"
                                                className="img-book-add rounded-top"
                                                alt="img-book"
                                            />
                                        </div>

                                        <Button
                                            variant="contained"
                                            component="label"
                                            color="secondary"
                                            sx={{
                                                marginTop: '12px',
                                                color: 'primary.main',
                                            }}

                                        >
                                            Upload File
                                            <input
                                                onChange={(e) => this.handelOnchangeInputImg(e)}
                                                type="file"
                                                hidden
                                            />
                                        </Button>

                                        <Box sx={{
                                            textAlign: 'center',
                                            mt: '20px'
                                        }}>
                                            <Typography variant="h6" component="h6">
                                                Cập nhật ảnh bìa
                                            </Typography>
                                            <Typography variant="p" component="p">
                                                Lưu ý: file ảnh không nặng quá 2MB. Đừng lo lắng nếu không tìm được ảnh bìa ưng ý, chúng tôi sẽ hỗ trợ làm giúp bạn ảnh bìa đẹp khi truyện được xuất bản

                                            </Typography>
                                        </Box>


                                    </Box>
                                </Grid>
                            </Grid>



                            <Box sx={{ marginBottom: '16px ' }}>
                                <Button variant="contained" color='secondary' sx={{ width: '100%', color: 'primary.main' }} onClick={() => this.handelEditBook()} >
                                    {!this.state.isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Cập Nhật"}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </>
            </>

        )

    }

}

export default EditBook