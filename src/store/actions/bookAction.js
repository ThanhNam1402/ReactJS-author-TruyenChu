import actionTypes from './actionTypes';
import booksService from '../../services/booksService';

export const getTagType = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getTagTypeRequest())
            let res = await booksService.handleGetAllTag()
            if (res && res.success) {

                let tagTypes = handleFilterAllTags(res.data)
                dispatch(getTagTypeSuccess(tagTypes))

            } else {
                // dispatch(server oi cuu em !!)
            }

        } catch (error) {
            // dispatch(server oi cuu em !!)
        }
    }
}

export const getTagTypeRequest = () => ({
    type: actionTypes.GET_TAGTYPE_REQUEST,
})

export const getTagTypeSuccess = (data) => ({
    type: actionTypes.GET_TAGTYPE_SUCCESS,
    payload: data,
})

export const handleFilterAllTags = (arrTagType) => {
    try {
        let cateState = ['WORLD', 'SCHOOL', 'POETRY', 'CHARACTER', 'STATE']

        let result = cateState.reduce((acc, type) => {
            const items = arrTagType.filter(item => item.type === type);
            acc[type] = items;
            return acc;
        }, {});


        console.log("result", result);
        return result

    } catch (error) {
        console.log(error.message);
    }
}


// ========================================================

export const getCategories = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getCateRequest())
            let res = await booksService.handleGetCateGoRy()

            if (res && res.success) {

                dispatch(getCategoriesSuccess(res.data))

            } else {
                // dispatch(server oi cuu em !!)
            }

        } catch (error) {
            // dispatch(server oi cuu em !!)
        }
    }
}

export const getCateRequest = () => ({
    type: actionTypes.GET_CATEGORIES_REQUEST,
})


export const getCategoriesSuccess = (data) => ({
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: data,
})



