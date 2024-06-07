


import axios from 'axios';
import store from './redux';

import actionTypes from './store/actions/actionTypes';
import * as actions from "./store/actions"

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

instance.interceptors.request.use((config) => {

    const currentState = store.getState()
    const token = currentState.user?.userInfo?.token?.token ?? '';

    if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(
    (response) => {

        return response.data;

    }, async (error) => {
        if (error.response) {

            console.log(error.response);

            if (error.response.status === 401) {
                const originalRequest = error.config;

                console.log("originalRequest.url", originalRequest.url);

                const currentState = store.getState()
                const refreshToken = currentState.user?.userInfo?.token?.refresh_token;

                // lặp vô tận khi refresh token is expired 
                if (error.response.status === 401 && originalRequest.url === `/api/refresh`) {
                    console.log(originalRequest.url);
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

                        let res = await instance.post(`/api/refresh`, {
                            token: refreshToken
                        })

                        if (res && res.success === true) {

                            await store.dispatch(actions.refreshTokenSuccess(res.data))

                            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                            originalRequest.headers['Authorization'] = `Bearer ${res.data.token}`;

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
