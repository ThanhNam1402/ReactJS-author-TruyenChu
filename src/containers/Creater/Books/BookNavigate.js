import React from 'react';
import { NavLink } from 'react-router-dom';


import './Book.scss'
import { Box } from '@mui/material';


class BookNavigation extends React.Component {


    render() {
        let { id } = this.props

        return (
            <>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: '16px', boxShadow: '1', borderRadius: '6px'

                }} className = 'book-navigate'>
                    <NavLink className='book-navi-item' to={`/creater/book/edit/${id}`}>
                        Chỉnh Sửa
                    </NavLink>

                    <NavLink className='book-navi-item' to={`/creater/book/${id}/chapters`}>
                        Danh Sách Chương
                    </NavLink>
                </Box>
            </>
        )

    }



}


export default BookNavigation;