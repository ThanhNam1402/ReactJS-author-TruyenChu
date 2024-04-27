import axios from "../axios";

const createrService = {

    handelgetToppic() {
        return axios.get(`/admin/api/topics?page=1&limit=10`)
    },
    handelgetTopicbBySlug(slug) {
        return axios.get(`/api/creater/topic/${slug}`)
    },
}

export default createrService