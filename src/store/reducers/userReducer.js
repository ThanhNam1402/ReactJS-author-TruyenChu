import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoginRedux: false,
    userInfo: {
        token: null,
        account: null,
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log(' token sucs');
            return {
                ...state,
                isLoginRedux: true,
                userInfo: {
                    token: action.payload
                }
            }
        case actionTypes.USER_LOGOUT_SUCCESS:
            console.log(' token fail');

            return {
                ...state,
                isLoginRedux: false,
                userInfo: {
                    token: null,
                    account: null
                }
            }

        case actionTypes.REFRESH_TOKEN_REQUEST:
            console.log('refresh token request');
            return {
                ...state,
            }
        case actionTypes.REFRESH_TOKEN_SUCCESS:
            console.log('refresh token success');
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    token: action.payload
                }
            }
        case actionTypes.REFRESH_TOKEN_FAIL:
            console.log('refresh token failed');
            return {
                ...state,
            }

        case actionTypes.GET_ACCOUNT_SUCCESS:
            console.log('get account success');
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    account: action.payload
                }
            }
        default:
            return state;
    }
}

export default userReducer;