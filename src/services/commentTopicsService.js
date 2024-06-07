import axios from "../axios";

const serviceCMTopics = {

    handleGetAllCommentTopics(topicID) {
        return axios.get(`/api/creator/comments/topic?topicID=${topicID}`)
    },
    handelGetOneDraft(id) {
        return axios.get(`/api/creator/draft/${id}`)
    },
    handleAddComment(data) {
        return axios.post(`/api/creator/comments/add`, data)
    },


    getAllReplys(commentID) {
        return axios.get(`/api/creator/comments/replys?commentID=${commentID}`)
    },


    handleDelComment(id) {
        return axios.delete(`/api/creator/comments/delete/${id}`);
    },

}

export default serviceCMTopics