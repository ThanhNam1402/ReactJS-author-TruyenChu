


import axios from 'axios';
import store from './redux';

import actionTypes from './store/actions/actionTypes';
import * as actions from "./store/actions"

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    }, async (error) => {
        if (error.response) {
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            // console.log(error.response);
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);

            if (error.response.status === 401) {
                const originalRequest = error.config;
                const currentState = store.getState()
                const refreshToken = currentState.user.userInfo.token.refresh_token;


                if (
                    error.response.status === 401 &&
                    originalRequest.url === `/api/refresh-token/`
                ) {
                    // history.push('/login');
                    window.location.href = '/login'
                    return Promise.reject(error);
                }


                if (
                    // error.response.data.message === 'Token is expired' &&
                    error.response.status === 401 &&
                    error.response.statusText === 'Unauthorized'
                ) {

                    if (refreshToken) {
                        store.dispatch({
                            type: actionTypes.REFRESH_TOKEN_REQUEST,
                        });

                        let res = await instance.post(`/api/refreshToken?token=${refreshToken}`)

                        if (res && res.EC === 0) {

                            await store.dispatch(actions.refreshTokenSuccess(res.data))


                            // token header => lastest
                            // now query? 
                            // instance.defaults.headers.common['x-auth-token'] = res.data.token;
                            // originalRequest.headers['x-auth-token'] = res.data.token;

                            error.response.config.data = { token: res.data.token }

                            return instance(error.config)
                        } else {
                            store.dispatch({
                                type: actionTypes.REFRESH_TOKEN_FAIL,
                            });

                            window.location.href = '/login';
                        }
                    } else {
                        window.location.href = '/login';
                    }
                }
            }


        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }

        return Promise.reject(error);
    }
);

export default instance;
