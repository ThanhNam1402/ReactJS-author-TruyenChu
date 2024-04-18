import actionTypes from './actionTypes';

import userService from '../../services/userService';

export const userLoginSuccess = (token) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: token,
})

export const saveTokenUser = (token) => ({
    type: actionTypes.USER_LOGIN_REQUEST,
    payload: token,
})

export const getAccountUser = (token) => {
    return async (dispatch, getState) => {
        try {

            console.log("token", token);

            let res = await userService.handelGetAccount(token)
            console.log("res", res);

            dispatch(getAccountSuccess(res.data))
        } catch (error) {
            dispatch(getAccountFail(error.message))
        }
    }
}

export const getAccountSuccess = (accoount) => ({
    type: actionTypes.GET_ACCOUNT_SUCCESS,
    payload: accoount,
})

export const getAccountFail = (messError) => ({
    type: actionTypes.GET_ACCOUNT_FAIL,
    payload: messError,
})

export const userLogout = (data) => ({
    type: actionTypes.USER_LOGOUT_SUCCESS,
})

export const refreshToken = (refreshToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.handleRefreshToken(refreshToken)
            console.log("res", res);
            let token = res.data
            dispatch(refreshTokenSuccess(token))
        } catch (error) {
            dispatch(refreshTokenFail(error.message))
        }
    }
}

export const refreshTokenFail = (message) => ({
    type: actionTypes.REFRESH_TOKEN_FAIL,
    payload: message
})

export const refreshTokenSuccess = (data) => ({
    type: actionTypes.REFRESH_TOKEN_SUCCESS,
    payload: data,
})