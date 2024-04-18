
import React, { Component } from 'react';
import logo from '../../../../src/assets/images/logo.png';
import bgNavigate from '../../../assets/images/bgNavigate.jpg';
import { NavLink } from 'react-router-dom';
import './NavCreater.scss';
import { Box, Typography } from '@mui/material';


import { Description, AddBoxOutlined, LibraryBooksOutlined, NoteAdd } from '@mui/icons-material';


class NavCreater extends Component {

    render() {

        return (
            <>
                <Box sx={{
                    bgcolor: 'primary.main',
                    width: '248px',
                    pl: '12px'
                }} className="left-sidebar">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: (theme) => theme.creater.navbar
                    }} >
                        <NavLink exact to="/" className="text-nowrap logo-img">
                            <img src={logo} height="60px" alt="a" />
                        </NavLink>
                    </Box>
                    <nav className="sidebar-nav scroll-sidebar d-flex flex-column justify-content-between">
                        <ul id="sidebarnav">
                            <li className="sidebar-item">
                                <Typography sx={{
                                    color: 'primary.sub',
                                    marginTop: '24px',
                                    marginBottom: '12px',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }} variant="span" component="div">
                                    Bản Thảo
                                </Typography>
                            </li>
                            <li className="sidebar-item">
                                <NavLink className="sidebar-link" exact to="/creater/drafts/new">
                                    <NoteAdd sx={{ color: 'primary.sub' }} />

                                    <Typography sx={{ color: 'primary.sub' }} variant="span" >
                                        Thêm Bản Thảo
                                    </Typography>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink className="sidebar-link" exact to="/creater/drafts">
                                    <Description sx={{ color: 'primary.sub' }} />
                                    <Typography sx={{ color: 'primary.sub' }} variant="span" >
                                        Các Bản Thảo
                                    </Typography>
                                </NavLink>
                            </li>
                            <li className="nav-small-cap">
                                <Typography sx={{
                                    color: 'primary.sub',
                                    marginTop: '24px',
                                    marginBottom: '12px',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }} variant="span" component="div">
                                    Bản Thảo
                                </Typography>
                            </li>
                            <li className="sidebar-item">
                                <NavLink className="sidebar-link" exact to="/creater/book/new">
                                    <AddBoxOutlined sx={{ color: 'primary.sub' }} />
                                    <Typography sx={{ color: 'primary.sub' }} variant="span" >
                                        Thêm Truyện
                                    </Typography>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink className="sidebar-link" exact to="/creater/books">
                                    <LibraryBooksOutlined sx={{ color: 'primary.sub' }} />
                                    <Typography sx={{ color: 'primary.sub' }} variant="span" >
                                        Truyện Của Tôi
                                    </Typography>
                                </NavLink>
                            </li>
                            <li className="nav-small-cap">
                                <Typography sx={{
                                    color: 'primary.sub',
                                    marginTop: '24px',
                                    marginBottom: '12px',
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }} variant="span" component="div">
                                    Trung Tâm Hỗ Trợ
                                </Typography>

                            </li>
                            <li className="sidebar-item">
                                <NavLink className="sidebar-link" exact to="/creater/knowledge-base">
                                    <Typography sx={{ color: 'primary.sub' }} variant="span" >
                                        Kiến Thức Cơ Bản
                                    </Typography>
                                </NavLink>

                            </li>
                            <li className="sidebar-item">
                                <NavLink className="sidebar-link" exact to="/creater/help">
                                    <Typography sx={{ color: 'primary.sub' }} variant="span" >
                                        Yêu Cầu Hỗ Trợ
                                    </Typography>
                                </NavLink>
                            </li>
                        </ul>

                        <Box className='img-navigation'>
                            <img src={bgNavigate} alt='namcute' className='w-100 rounded-3 ' style={{ 'height': '60px' }} />
                        </Box>
                    </nav>

                </Box >
            </>
        );
    }

}


export default NavCreater;
