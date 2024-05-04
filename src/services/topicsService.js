import axios from "../axios";

const topicsService = {

    handlegetAllTopics() {
        return axios.get(`/api/creator/topics?page=1&limit=10`)
    },
    handlegetTopicBySlug(slug) {
        return axios.get(`/api/creator/topic/${slug}`)
    },
}

export default topicsService