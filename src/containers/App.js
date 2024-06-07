import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { path } from '../utils'

import HomeCreater from '../routes/HomeCreater';

import Login from './Auth/Login';

import './App.scss';

import '../components/CustomToast.scss';
import { CustomToastCloseButton } from '../components/CustomToast';

class App extends Component {
    render() {
        return (
            <>
                <Router history={history}>
                    <div className="main-container">
                        <Switch>
                            <Route path={path.LOGIN} component={(Login)} />
                            <Route path={path.Creator} component={(HomeCreater)} />
                        </Switch>
                    </div>

                    <ToastContainer
                        className="toast-texxt" toastClassName="toast-item" bodyClassName="toast-item-body"
                        autoClose={10000} position="top-right"
                        hideProgressBar={false} closeOnClick pauseOnHover
                        closeButton={<CustomToastCloseButton />}
                    />
                </Router>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);