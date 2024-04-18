import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavCreater from '../../../ReactJS/src/containers/Creater/Navigation/NavCreater.js';
import HeaderCreater from '../../../ReactJS/src/containers/Creater/HeaderCreater.js';
import HomePage from '../../../ReactJS/src/containers/Creater/Home/HomePage.js';

import Books from '../../../ReactJS/src/containers/Creater/Books/Books.js';
import AddBook from '../../../ReactJS/src/containers/Creater/Books/AddBook.js';
import EditBook from '../../../ReactJS/src/containers/Creater/Books/EditBook.js';

import AddDraft from '../../../ReactJS/src/containers/Creater/Draft/AddDraft.jsx';
import Draft from '../../../ReactJS/src/containers/Creater/Draft/ListDraft.js';
import DetailDraft from '../../../ReactJS/src/containers/Creater/Draft/DetailDraft.jsx';

import Chaters from '../../../ReactJS/src/containers/Creater/Chapters/Chapters.js';
import EditChapter from '../../../ReactJS/src/containers/Creater/Chapters/EditChapter.js';
import DetailTopic from '../containers/Creater/Home/DetailTopic.js';


import * as actions from "../store/actions";

import './HomeCreater.scss';

import { Box, Container } from '@mui/material';

class HomeCreater extends Component {



    // khi didmoount vẫn lấy được dữ liệu 
    // nhưng khi reload lại thì dữ liệu lại nhảy xuống did-update
    // nên get account trong did-update
    componentDidUpdate(prevProps, prevState, snapshot) {

        let { user, getAccountUser } = this.props;

        if (!user.isLoginRedux) {
            this.props.history.push('/login')
        }

        if (user.isLoginRedux && user.userInfo.account === null) {
            getAccountUser(user.userInfo.token)
        }

    }


    render() {

        return (
            <Container maxWidth={false} disableGutters sx={{ backgroundColor: 'primary.main' }}>
                <Box sx={{ display: 'flex' }}>
                    <div className=''>
                        <NavCreater />
                    </div>
                    <div className='w-100'>
                        <HeaderCreater />

                        <Box className="body-wrapper content" sx={{
                            pb: '90px'
                        }}>
                            <Switch>
                                <Route path="/" exact component={HomePage} />

                                <Route path="/creater/topic/:slug" exact component={DetailTopic} />

                                <Route path="/creater/drafts/new" component={AddDraft} />
                                <Route path="/creater/drafts" exact component={Draft} />
                                <Route path="/creater/drafts/edit/:id" exact component={DetailDraft} />

                                <Route path="/creater/book/new" component={AddBook} />
                                <Route path="/creater/books" exact component={Books} />
                                <Route path="/creater/book/edit/:id" exact component={EditBook} />

                                <Route path="/creater/book/:id/chapters" exact component={Chaters} />
                                <Route path="/creater/books/chapters/edit/:id" exact component={EditChapter} />

                            </Switch>
                        </Box>
                    </div>
                </Box>
            </Container>
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.user ? state.user : null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAccountUser: (token) => dispatch(actions.getAccountUser(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCreater);
