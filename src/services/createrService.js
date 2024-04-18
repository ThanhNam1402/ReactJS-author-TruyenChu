import axios from "../axios";

const createrService = {

    handelgetToppic() {
        return axios.get(`/admin/api/topics?page=1&limit=10`)
    },
    handelgetTopicbBySlug(slug) {
        return axios.get(`/api/creater/topic/${slug}`)
    },

    // BOOK >>>>

    handelGetCateGoRy() {
        return axios.get(`/api/creater/getCateGoRy`)
    },

    handelgetBooks(creatorID) {
        return axios.get(`/api/creater/getBooks?creatorID=${creatorID}`)
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
        return axios.put(`/api/creater/editDraft`, data)
    },
    handelUpdateDraftByID(data) {
        return axios.put(`/api/creater/editDraftByID`, data)
    },
    handelgetDrafts(creatorID) {
        return axios.get(`/api/creater/getDrafts?creatorID=${creatorID}`)
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