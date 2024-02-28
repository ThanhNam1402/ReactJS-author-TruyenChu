import axios from "../axios";

const createrService = {

    // BOOK >>>>

    handelGetCateGoRy() {
        return axios.get(`/api/creater/getCateGoRy`)
    },

    handelgetBooks() {
        return axios.get(`/api/creater/getBooks`)
    },

    handelAddBook(data) {
        return axios.post(`/api/creater/addBook`, data)
    },

    handelEditBookByID(data) {
        return axios.put(`/api/creater/editBook`, data)
    },
    handelEditChapter(data) {
        return axios.put(`/api/creater/editChapter`, data)
    },

    handelDelBook(id) {
        return axios.delete('/api/creater/delBook', {
            data: {
                id: id
            }
        });
    },


    handelgetBookByID(id) {
        return axios.get(`/api/creater/getBookById?id=${id}`)
    },

    // DRAFT >>>> 
    handelCreateDrafft(data) {
        return axios.post(`/api/creater/createDraft`, data)
    },
    handelAutoSaveDraft(data) {
        return axios.post(`/api/creater/editDraft`, data)
    },
    handelUpdateDraftByID(data) {
        return axios.post(`/api/creater/editDraftByID`, data)
    },
    handelgetDrafts() {
        return axios.get(`/api/creater/getDrafts`)
    },

    handelgetDraftByID(id) {
        return axios.get(`/api/creater/getDraftById?id=${id}`)
    },

    handelDelDraft(id) {
        return axios.delete('/api/creater/delDraft', {
            data: {
                id: id
            }
        });
    },


    // CHAPTER >>>> 

    handelgetChapterByBookID(id) {
        return axios.get(`/api/creater/getChapterByBookID?bookID=${id}`)
    },


    // ORTHER >>>>

    handelGetCodeByType(type) {
        return axios.get(`/api/creater/getCodeByType?type=${type}`)
    },
    handelGetAllCode() {
        return axios.get(`/api/creater/getAllCode`)
    }


}

export default createrService