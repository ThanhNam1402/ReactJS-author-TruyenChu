import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';

import NavCreater from '../../../ReactJS/src/containers/Creater/Navigation/NavCreater.js';
import HeaderCreater from '../containers/Creater/HeaderCreator.js';
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
import { delay } from '../utils';



class HomeCreater extends Component {

    async componentDidMount() {

        await delay(1000)
        console.log('mount 1s', this.props);

        let { user, optionBook, getAccountUser, getTagType, getCategories } = this.props;

        if (user && !user.isLoginRedux) {
            this.props.history.push('/login')
        } else {
            let allTagTypes = optionBook.tagType
            let token = user.userInfo.token.token
            let categories = optionBook.categories

            await getAccountUser(token)

            if (allTagTypes && _.isEmpty(allTagTypes)) {
                await getTagType()
            }

            if (categories && _.isEmpty(categories)) {
                await getCategories()
            }
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

                        <Box className="content" sx={{ pb: '90px' }}>
                            <Switch>
                                <Route path="/" exact component={HomePage} />

                                <Route path="/creator/topic/:slug" exact component={DetailTopic} />

                                <Route path="/creator/drafts/new" component={AddDraft} />
                                <Route path="/creator/drafts" exact component={Draft} />
                                <Route path="/creator/drafts/edit/:id" exact component={DetailDraft} />

                                <Route path="/creator/book/new" component={AddBook} />
                                <Route path="/creator/books" exact component={Books} />
                                <Route path="/creator/book/edit/:id" exact component={EditBook} />

                                <Route path="/creator/book/:id/chapters" exact component={Chaters} />
                                <Route path="/creator/books/chapters/edit/:id" exact component={EditChapter} />

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
        user: state.user ? state.user : null,
        optionBook: state.book
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAccountUser: (token) => dispatch(actions.getAccountUser(token)),
        getTagType: () => dispatch(actions.getTagType()),
        getCategories: () => dispatch(actions.getCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCreater);
