import actionTypes from './actionTypes';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
// import { dispatch } from '../../redux';


export const adminLoginSuccess = (userInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.ADMIN_PROCESS_LOGOUT
})

// export const fetchGenderStart = () => ({ 
//     type : actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await userService.handelGetAllCode('gender');

            if (res && res.data && res.data.errorCode === 0) {
                dispatch(fetchGenderSuccess(res.data.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genderData: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await userService.handelGetAllCode('role');

            if (res && res.data && res.data.errorCode === 0) {
                dispatch(fetchRoleSuccess(res.data.data));
            } else {
                dispatch((fetchRoleFailed));
            }
        } catch (error) {
            dispatch((fetchRoleFailed));
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roleData: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.handelCreateUser(data);
            if (res && res.data && res.data.errorCode === 0) {
                toast.success('hihi')
                dispatch(createUsersuccess(res.data.data));
            } else {
                dispatch(createUserFailed());
            }
        } catch (error) {
            dispatch((fetchRoleFailed));
        }
    }
}

export const createUsersuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})


export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_USER_START })
            let res = await userService.handelGetAllUser();

            if (res && res.errorCode === 0) {
                dispatch(fetchUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchUserFailed());
            }
        } catch (error) {
            dispatch(fetchUserFailed());
        }
    }
}
export const fetchUserSuccess = (userData) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    userData: userData
})

export const fetchUserFailed = () => ({
    type: actionTypes.FETCH_USER_FAILED
})



export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.handelDelUser   (id);
            if (res && res.data && res.data.errorCode === 0) {
                toast.success('Xoas')
                dispatch(deleteUserSuccess());
            } else {
                dispatch(createUserFailed());
            }
        } catch (error) {
            dispatch((fetchRoleFailed));
        }
    }
}


export const deleteUserSuccess = (userData) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})