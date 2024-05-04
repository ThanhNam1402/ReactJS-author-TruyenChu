import axios from "../axios";

const serviceDrafts = {

    handlegetAllDrafts(creatorID) {
        return axios.get(`/api/creator/drafts?creatorID=${creatorID}`)
    },
    handelGetOneDraft(id) {
        return axios.get(`/api/creator/draft/${id}`)
    },
    handleAddDraft(data) {
        return axios.post(`/api/creator/addDraft`, data)
    },
    handleUpdateDraft(data) {
        return axios.put(`/api/creator/draft/${data.id}`, data)
    },
    handlePublish(data) {
        return axios.put(`/api/creator/draft/public`, data)
    },
    handleDelDraft(id) {
        return axios.delete(`/api/creator/draft/${id}`);
    },


    // CHAPTER >>>> 

    handleGetAllChapters(id) {
        return axios.get(`/api/creator/chapters?bookID=${id}`)
    },

    handleUpdateChapter(data) {
        return axios.put(`/api/creator/chapter/${data.id}`, data)
    },

}

export default serviceDrafts