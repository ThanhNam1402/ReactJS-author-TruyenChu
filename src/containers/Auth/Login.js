import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import userService from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''

        }
    }



    handelChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    handelChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    handelSubmit = async () => {
        try {
            let data = await userService.loginUser(this.state.email, this.state.password);
            console.log(data);

            if (data && data.errorCode !== 0) {
                this.setState({ errorMessage: data.message });
            }
            if (data && data.errorCode === 0) {
                const { userLoginSuccess } = this.props;
                userLoginSuccess(data.user)
            }


        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({
                    errorMessage: error.response.data.message

                })
            }
        }

    }


    render() {

        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className='login-header'>
                        <h4>Login</h4>
                    </div>

                    <span className='text-danger d-block bg-light py-2'>
                        {this.state.errorMessage}
                    </span>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={(e) => this.handelChangeEmail(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={this.state.password} onChange={(e) => this.handelChangePassword(e)} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn-login" onClick={() => this.handelSubmit()}>Login</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
