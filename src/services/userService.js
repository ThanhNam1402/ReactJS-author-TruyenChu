import axios from '../axios';
// import * as queryString from 'query-string';

const userService = {
  
    loginUser(email, password) {
        return axios.post(`/api/login`, {email, password})
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
        return axios.get(`/api/getAllCode/?type=${type}` )
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