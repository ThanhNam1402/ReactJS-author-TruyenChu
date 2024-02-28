import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles : [],
    users : [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copptState = {...state}
            copptState.genders = action.genderData
            return {
                ...copptState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.roleData
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }
        case actionTypes.FETCH_USER_START:

            console.log('start', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_USER_SUCCESS:
            console.log('start sucss', action)

            state.users = action.userData
            return {
                ...state,
            }
        case actionTypes.FETCH_USER_FAILED:
            console.log('fail', action)

            state.users = []
            return {
                ...state,
            }
            
        default:
            return state;
    }
}

export default adminReducer;