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
            return {
                ...state,
                isLoginRedux: true,
                userInfo: {
                    token: action.payload
                }
            }
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoginRedux: false,
                userInfo: {
                    token: null,
                    account: null
                }
            }

        case actionTypes.REFRESH_TOKEN_REQUEST:
            return {
                ...state,
            }
        case actionTypes.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    token: action.payload
                }
            }
        case actionTypes.REFRESH_TOKEN_FAIL:
            return {
                ...state,
            }

        case actionTypes.GET_ACCOUNT_SUCCESS:
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