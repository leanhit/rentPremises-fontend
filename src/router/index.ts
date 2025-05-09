import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // đường dẫn tùy vào bạn

import Help from '@/views/public/Help.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/public/Login.vue';
import Register from '@/views/public/register/RegistrationForm.vue';
import AdminDashboard from '@/views/private/admin/dashboard/index.vue';
import Lease from '@/views/private/user/lease/Index.vue';
import Profile from '@/views/private/user/profile/Index.vue';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresGuest: true },
    },
    {
        path: '/help',
        name: 'help',
        component: Help,
    },
    {
        path: '/lease',
        name: 'lease',
        component: Lease,
        //meta: { requiresGuest: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        //meta: { requiresGuest: true },
    },
    {
        path: '/admin',
        component: AdminDashboard,
        name: 'LayoutZoter',
        meta: { requiresAuth: true },
        redirect: '/admin/redirect-by-role',
        children: [
            {
                path: '/dashboard',
                name: '/dashboard',
                component: AdminDashboard,
                meta: { requiresAuth: true, role: 'ADMIN' },
            },
            {
                path: 'redirect-by-role',
                name: 'redirect-by-role',
                beforeEnter: (to, from, next) => {
                    const role = localStorage.getItem('role');
                    if (role === 'ADMIN') {
                        next({ name: 'dashboard' });
                    } else if (role === 'USER') {
                        next({ name: '/' });
                    } else {
                        next('/login');
                    }
                },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    const isAuthenticated = authStore.isLoggedIn; // reactive
    const role = authStore.user?.role; // ví dụ: 'ADMIN' | 'USER'

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresGuest && isAuthenticated) {
        if (role === 'ADMIN' && to.path !== '/admin/dashboard') {
            next('/admin/dashboard');
        } else if (role === 'USER' && to.path !== '/') {
            next('/');
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;
