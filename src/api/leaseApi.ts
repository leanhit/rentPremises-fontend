// src/api/usersApi.ts
import api from '@/api/instance';

export const leaseApi = {
    addProperty(params: any) {
        return api.post(`/lease/addProperty`, params);
    },

    getPropertes() {
        return api.get(`/lease/propertes`);
    },

    updatePropertes(params: any) {
        return api.put(`/lease/propertes`, params);
    },

};
