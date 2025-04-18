import { defineStore } from 'pinia';
// store/auth.js (Pinia)
export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        user: null, // chứa role
    }),
    actions: {
        login(token: any, user: any) {
            this.token = token;
            this.user = user;
        },
        logout() {
            this.token = null;
            this.user = null;
        },
    },
});
