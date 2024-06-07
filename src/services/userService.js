import axios from '../axios';
// import * as queryString from 'query-string';

const userService = {

    handelLogin(user) {
        return axios.post(`/api/login`, user);
    },
    handelLogout() {
        return axios.post(`/api/logout`);
    },

    handleRefreshToken() {
        return axios.post(`/api/refresh`);
    },

    handelGetAccount(token) {
        return axios.post(`/api/me`, { token: token });
    },

};

export default userService;