import axios from "../axios";

const serviceBooks = {

    handlegetAllBooks(creatorID) {
        return axios.get(`/api/creator/books?creatorID=${creatorID}`)
    },
    handleGetOneBook(id) {
        return axios.get(`/api/creator/book/${id}`)
    },
    handleAddBook(data) {
        return axios.post(`/api/creator/addBook`, data)
    },
    handleUpdateBook(data) {
        return axios.put(`/api/creator/book/${data.id}`, data)
    },
    handleDelBook(id) {
        return axios.delete(`/api/creator/book/${id}`);
    },

    handleGetCateGoRy() {
        return axios.get(`/api/creator/getCateGoRy`)
    },

    handleGetAllTag() {
        return axios.get(`/api/creator/getTagType`)
    }
}

export default serviceBooks