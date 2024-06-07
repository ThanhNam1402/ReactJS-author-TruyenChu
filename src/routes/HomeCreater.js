import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import { Box, Container } from '@mui/material';

import NavCreater from '../containers/Creater/Navigation/NavCreater';
import HeaderCreater from '../containers/Creater/HeaderCreator';
import HomePage from "../containers/Creater/Home/HomePage";

import Books from "../containers/Creater/Books/Books";
import AddBook from "../containers/Creater/Books/AddBook";
import EditBook from "../containers/Creater/Books/EditBook";

import AddDraft from "../containers/Creater/Draft/AddDraft";
import Draft from "../containers/Creater/Draft/ListDraft";
import DetailDraft from "../containers/Creater/Draft/DetailDraft";

import Chaters from "../containers/Creater/Chapters/Chapters";
import EditChapter from "../containers/Creater/Chapters/EditChapter";
import DetailTopic from "../containers/Creater/topics/DetailTopic";

import * as actions from "../store/actions";
import { delay } from '../utils';
import './HomeCreater.scss';


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

    componentDidUpdate() {

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
