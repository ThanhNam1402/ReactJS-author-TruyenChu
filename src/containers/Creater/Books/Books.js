import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { Typography, Box, Grid } from '@mui/material';
import { Button as ButtonMUI } from '@mui/material';

import serviceBooks from '../../../services/booksService';
import { delay } from '../../../utils';
import CsLoading from '../../../components/CsLoading';
import SearchComponent from '../../../components/SearchComponent';
import SelectInput from '../../../components/SelectInput';
import ItemBook from './ItemBook';

import './Book.scss'


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBook: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        this.handleGetBook()
    }
    handleOnChange(e) {
        console.log(e);
    }

    handleGetBook = async () => {
        try {
            this.setState({ isLoading: true })
            await delay(1000)

            let creatorID = this.props.userAccount.id
            let res = await serviceBooks.handlegetAllBooks(creatorID);

            if (res && res.success === true) {
                this.setState({
                    listBook: res.data,
                    isLoading: false,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }


    handleDelBook = async (id) => {
        try {
            let res = await serviceBooks.handleDelBook(id)

            if (res && res.success === true) {
                this.handleGetBook()
                toast.success(res.message)
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {

        let { listBook, isLoading } = this.state

        return (
            <>
                <Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: '500', color: 'primary.sub' }} variant='h4'>
                        Truyện của tôi
                    </Typography>
                    <Typography sx={{ color: 'primary.sub', marginBottom: '24px' }} variant='p' component='p'>
                        Danh sách các truyện bạn đã đăng
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

                    <SelectInput
                        handleOnChange={this.handleOnChange}
                    />

                    <SearchComponent />

                </Box >

                {
                    isLoading ?

                        <CsLoading /> :

                        <Grid container spacing={2}>
                            {listBook && listBook.length > 0 &&
                                listBook.map((item, index) => {
                                    return (
                                        <ItemBook item={item} key={index} handleDelBook={this.handleDelBook} />
                                    )
                                })
                            }



                            {/* test  */}
                            {
                                listBook.length >= -1 &&
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '16px' }}>
                                    <ButtonMUI variant="contained" color="secondary">Xem Thêm</ButtonMUI>
                                </Box>
                            }

                        </Grid >
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

export default connect(mapStateToProps)(Books);
