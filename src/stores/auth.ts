import { defineStore } from 'pinia';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

function loadUser(): User | null {
    try {
        return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
        return null;
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('accessToken') as string | null,
        user: loadUser() as User | null,
        role: localStorage.getItem('role') || null,
    }),

    getters: {
        isLoggedIn: (state) => !!state.token,
    },

    actions: {
        login(token: string, user: User) {
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

        async fetchUser() {
            if (!this.token) return;

            try {
                const res = await fetch('/api/me', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                if (!res.ok) throw new Error('Failed to fetch user info');

                const userData = await res.json();
                this.user = userData;
                this.role = userData.role;

                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('role', userData.role);
            } catch (err) {
                console.error('Error fetching user:', err);
                this.logout();
            }
        },

        updateUserProfile(updates: Partial<User>) {
            if (!this.user) return;
            this.user = { ...this.user, ...updates };
            localStorage.setItem('user', JSON.stringify(this.user));
        },
    },
});
