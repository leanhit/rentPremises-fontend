// src/api/usersApi.ts
import axios from 'axios';
import api from '@/api/instance';

export const usersApi = {
    getUserByID() {
        return api.get(`/auth/users/`);
    },

    login(params: any) {
        return axios.post(`/auth/login`, params);
    },

    register(params: any) {
        return axios.post(`/auth/register`, params);
    },

    checkUsername(username: string) {
        return api.get(`/auth/check-username`, {
            params: { username },
        });
    },

    checkEmail(email: string) {
        return api.get(`/auth/check-email`, {
            params: { email },
        });
    },

    getProfile() {
        return api.get(`/auth/profile`);
    },

    updateProfile(params: any) {
        return api.put(`/auth/profile`, params);
    },
};
