// src/stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('accessToken'),
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        role: localStorage.getItem('role'),
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        login(token: string, user: any) {
            this.token = token;
            this.user = user;
            this.role = user.role;

            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('role', user.role);
        },
        logout() {
            this.token = null;
            this.user = null;
            this.role = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
        },
    },
});
