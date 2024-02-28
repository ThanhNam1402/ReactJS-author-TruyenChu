import React, { Component } from 'react';
import createrService from '../../../services/createrService';
import BookNavigation from './BookNavigate'
import '../Home.scss';

import { toast } from 'react-toastify';

import SelectCateBook from './SelectCateBook';
import { Card, CardContent, Box, Button, Typography, InputLabel, TextField } from '@mui/material';





class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            WORLD: [],
            CHARACTER: [],
            POETRY: [],
            SCHOOL: [],
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
            }
        }
    }

    async componentDidMount() {
        try {
            let id = this.props.match.params.id

            let res = await createrService.handelgetBookByID(id);

            if (res && res.EC === 0) {

                let data = res.data

                this.setState({
                    book: {
                        bookPoetry: data.poetry,
                        name: data.name,
                        bookSchool: data.school,
                        bookWorld: data.world,
                        categoryID: data.categoryID,
                        bookChar: data.character,
                        content: data.content
                    }
                })

                this.handelGetAllCode()
                this.handelGetCateGoRy()

            } else {
                console.log('Not foound Book ??? ');
            }

        } catch (error) {
            console.log(error);
        }
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

    handelGetCateGoRy = async () => {
        let coppyState = { ...this.state.arrCategory }
        let cate = await createrService.handelGetCateGoRy();
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


    handelEditBook = async () => {

        try {
            let id = this.props.match.params.id
            let data = { ...this.state.book, id }
            let res = await createrService.handelEditBookByID(data)

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

        let { WORLD, SCHOOL, POETRY, CHARACTER, arrCategory } = this.state;
        let { content, name, bookPoetry, bookSchool, bookChar, bookWorld, categoryID } = this.state.book

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

                            <Box sx={{ mb: '16px' }}>
                                <label htmlFor="content" className="label-form">Giới thiệu</label>
                                <textarea className="form-control bookDescription" id='content' rows="6"
                                    onChange={(e) => this.handelInputVale(e, 'content')}
                                    value={content}
                                    placeholder='Tóm tắt cho truyện không nên quá dài mà nên ngắn gọn, Tập trung, thú vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không. Tối đa 700 từ'>
                                </textarea>
                            </Box>
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