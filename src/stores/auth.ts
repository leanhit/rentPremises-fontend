import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('accessToken'),
        user: null,
        systemRole: localStorage.getItem('systemRole'),
    }),
    actions: {
        login(token: string, user: any) {
            this.token = token;
            this.user = user;
            this.systemRole = user.systemRole; // Assuming user object has systemRole or role property

            localStorage.setItem('accessToken', token);
            localStorage.setItem('systemRole', user.systemRole); // Save systemRole or role to localStorage
        },
        logout() {
            this.token = null;
            this.user = null;
            this.systemRole = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('systemRole');
        },
    },
});
