// src/stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('accessToken'),
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        systemRole: localStorage.getItem('systemRole'),
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        login(token: string, user: any) {
            this.token = token;
            this.user = user;
            this.systemRole = user.systemRole;

            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('systemRole', user.systemRole);
        },
        logout() {
            this.token = null;
            this.user = null;
            this.systemRole = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('systemRole');
        },
    },
});
