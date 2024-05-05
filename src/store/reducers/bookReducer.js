import actionTypes from '../actions/actionTypes';

const initialState = {
    tagType: {
        WORLD: [],
        CHARACTER: [],
        POETRY: [],
        SCHOOL: [],
        STATE: [],
    },
    categories: []

}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TAGTYPE_REQUEST:
            console.log('tagtype request');
            return {
                ...state,
            }
        case actionTypes.GET_TAGTYPE_SUCCESS:
            console.log('tagtype sucecess');
            return {
                ...state,
                tagType: action.payload
            }
            
        case actionTypes.GET_CATEGORIES_REQUEST:
            console.log('get cate request');
            return {
                ...state,
            }
        case actionTypes.GET_CATEGORIES_SUCCESS:
            console.log('cate sucecess');
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}

export default bookReducer;