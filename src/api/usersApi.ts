import axios from 'axios';

export const usersApi = {
    getUserByID() {
        return axios.get(`/auth/users/`);
    },

    login(params: any) {
        return axios.post(`/auth/login`, params);
    },

    register(params: any) {
        return axios.post(`/auth/register`, params);
    },

    checkUsername(username: string) {
        return axios.get(`/auth/check-username`, {
            params: { username },
        });
    },

    checkEmail(email: string) {
        return axios.get(`/auth/check-email`, {
            params: { email },
        });
    },
};
