import axios from '../axios';
// import * as queryString from 'query-string';

const userService = {

    handelLogin(user) {
        return axios.post(`/api/login`, user);
    },
    handelLogout() {
        return axios.post(`/api/logout`);
    },

    handleRefreshToken(refreshToken) {
        return axios.post(`/api/refreshToken?token=${refreshToken}`);
    },

    handelGetAccount(token) {
        return axios.post(`/api/account`, token);
    },


    handelGetAllUser() {
        return axios.get(`/api/getAllUser`)
    },
    handelCreateUser(data) {
        return axios.post(`/api/createUser`, data)
    },
    handelUpdateUser(data) {
        return axios.put(`/api/editUser`, data)
    },
    handelGetAllCode(type) {
        return axios.get(`/api/getAllCode/?type=${type}`)
    },

    handelDelUser(id) {
        return axios.delete('/api/delUser', {
            data: {
                id: id
            }
        });
    }

};

export default userService;