import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import CustomScrollbars from '../components/CustomScrollbars';
import { path } from '../utils'

import Login from '../containers/Auth/Login';
import HomeCreater from '../routes/HomeCreater';

import './App.scss';


import '../components/CustomToast.scss';
import { CustomToastCloseButton } from '../components/CustomToast';

class App extends Component {

    componentDidMount() {
        console.log('namcute');
    }

    render() {
        return (
            <>
                <Router history={history}>

                    <div className="main-container">
                        <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                            <Switch>
                                <Route path={path.Creater} component={(HomeCreater)} />
                                <Route path={path.LOGIN} component={Login} />
                            </Switch>
                        </CustomScrollbars>
                    </div>

                    <ToastContainer
                        className="toast-texxt" toastClassName="toast-item" bodyClassName="toast-item-body"
                        autoClose={3000} position="top-right"
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
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);