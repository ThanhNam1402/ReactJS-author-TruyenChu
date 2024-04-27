import axios from "../axios";

const serviceBooks = {
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

    handelGetAllTag() {
        return axios.get(`/api/creater/getAllCode`)
    }
}

export default serviceBooks