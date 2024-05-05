import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Card, CardContent, Box, Button, Typography, InputLabel, TextField, Grid } from '@mui/material';

import serviceBooks from '../../../services/booksService';
import CsLoading from '../../../components/CsLoading';
import SelectCateBook from './SelectCateBook';
import BookNavigation from './BookNavigate'
import { delay } from '../../../utils';
import '../Home.scss';



class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

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
        this.handleGetBook()
    }

    handleGetBook = async () => {
        try {
            this.setState({ isLoading: true })
            await delay(1000)

            let id = this.props.match.params.id
            let res = await serviceBooks.handleGetOneBook(id);

            if (res && res.success === true) {
                let data = res.data

                this.setState({
                    book: {
                        name: data.name,
                        bookPoetry: data.poetry,
                        bookSchool: data.school,
                        bookWorld: data.world,
                        bookState: data.state,
                        categoryID: data.categoryID,
                        bookChar: data.character,
                        content: data.content
                    },
                    isLoading: false
                })
            } else {
                toast.error(res.message)
            }

        } catch (error) {
            console.log(error);
        }
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
            let res = await serviceBooks.handleUpdateBook(data)

            if (res && res.success === true) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let { isLoading } = this.state;
        let { content, name, bookPoetry, bookSchool, bookState, bookChar, bookWorld, categoryID } = this.state.book
        let categories = this.props.optionBook?.categories
        let { WORLD, CHARACTER, SCHOOL, POETRY, STATE } = this.props.optionBook?.tagType

        return (
            <>
                <div>
                    <Typography sx={{ fontSize: '20px', fontWeight: '500', color: 'primary.sub', mb: '24px' }} variant='h4'>
                        Chỉnh Sửa
                    </Typography>
                </div>
                <BookNavigation
                    id={this.props.match.params.id}
                />

                {isLoading ?

                    <CsLoading />
                    :
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
                                    multiline minRows={6}
                                    placeholder='Tóm tắt cho truyện không nên quá dài mà nên ngắn gọn, Tập trung, thú vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không. Tối đa 700 từ'
                                    id="input-content" size="small"
                                    onChange={(e) => this.handelInputVale(e, 'content')}
                                    value={content}
                                />
                            </Box>

                            <Grid container sx={{ mb: '30px' }} spacing={2}>
                                <Grid item xs={6}>

                                    <SelectCateBook
                                        valueInputDefault={categoryID}
                                        cateValue={categories}
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
                                <Button variant="contained" color='secondary' fullWidth onClick={() => this.handelEditBook()} >
                                    Cập Nhật
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                }
            </>
        )

    }

}

const mapStateToProps = state => {
    return {
        optionBook: state.book
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
