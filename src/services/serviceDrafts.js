import axios from "../axios";

const serviceDrafts = {

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

}

export default serviceDrafts