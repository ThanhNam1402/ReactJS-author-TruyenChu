import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import './Book.scss'

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

                }} className='book-navigate'>
                    <NavLink className='book-navi-item' to={`/creator/book/edit/${id}`}>
                        <Typography sx={{ color: 'primary.sub' }} component='span'>Chỉnh Sửa</Typography>
                    </NavLink>

                    <NavLink className='book-navi-item' to={`/creator/book/${id}/chapters`}>
                        <Typography sx={{ color: 'primary.sub' }} component='span'> Danh Sách Chương</Typography>
                    </NavLink>
                </Box>
            </>
        )
    }
}


export default BookNavigation;