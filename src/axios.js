


import axios from 'axios';

import actionTypes from './store/actions/actionTypes';
import * as actions from "./store/actions"

import store from './redux';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    }, async (error) => {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            // if (error.response.status === 401) {
            //     console.log('push token is not authorized');

            //     const currentState = store.getState()

            //     console.log(currentState);
            //     const token = currentState.user.userInfo.token ?? ''

            //     if (token && token.refresh_token) {
            //         store.dispatch({
            //             type: actionTypes.REFRESH_TOKEN_REQUEST,
            //         });

            //         await store.dispatch(actions.refreshToken(token.refresh_token))
            //         return instance(error.config)

            //     } else {
            //         console.log('login');
            //     }
            // }

        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }

        return Promise.reject(error);
    }
);

export default instance;
