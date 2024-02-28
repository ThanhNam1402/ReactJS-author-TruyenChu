import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavCreater from '../containers/Creater/Navigation/NavCreater';
import HeaderCreater from '../containers/Creater/HeaderCreater';
import HomePage from '../containers/Creater/Home/HomePage';

import Books from '../containers/Creater/Books/Books';
import AddBook from '../containers/Creater/Books/AddBook';
import EditBook from '../containers/Creater/Books/EditBook';

import AddDraft from '../containers/Creater/Draft/AddDraft.jsx';
import Draft from '../containers/Creater/Draft/ListDraft';
import DetailDraft from '../containers/Creater/Draft/DetailDraft.jsx';

import Chaters from '../containers/Creater/Chapters/Chapters';
import EditChapter from '../containers/Creater/Chapters/EditChapter';

import './HomeCreater.scss';

import { Box, Container } from '@mui/material';

class HomeCreater extends Component {

    render() {
        return (
            <Container maxWidth={false} disableGutters sx={{ backgroundColor: 'primary.main' }}>
                <Box sx={{ display: 'flex' }}>
                    <div className=''>
                        <NavCreater />
                    </div>
                    <div className='w-100'>
                        <HeaderCreater />

                        <div className="body-wrapper content">
                            <Switch>
                                <Route path="/creater" exact component={HomePage} />
                                <Route path="/creater/drafts/new" component={AddDraft} />
                                <Route path="/creater/drafts" exact component={Draft} />
                                <Route path="/creater/drafts/edit/:id" exact component={DetailDraft} />

                                <Route path="/creater/book/new" component={AddBook} />
                                <Route path="/creater/books" exact component={Books} />
                                <Route path="/creater/book/edit/:id" exact component={EditBook} />

                                <Route path="/creater/book/:id/chapters" exact component={Chaters} />
                                <Route path="/creater/books/chapters/edit/:id" exact component={EditChapter} />

                            </Switch>
                        </div>
                    </div>
                </Box>
            </Container>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCreater);
