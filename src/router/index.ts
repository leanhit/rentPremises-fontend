import { createRouter, createWebHistory } from 'vue-router';

import ZoterDefault from '@/layouts/ZoterDefault.vue';
import Login from '@/views/public/Login.vue';
import Register from '@/views/public/register/RegistrationForm.vue';
import Home from '@/views/public/Home.vue'; // Trang giới thiệu

localStorage.removeItem('accessToken');

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },{
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresGuest: true }, // Chỉ cho phép khách chưa login
    },
    {
        path: '/app',
        component: ZoterDefault,
        name: 'LayoutZoter',
        meta: { requiresAuth: true },
        redirect: '/app/dashboard',
        children: [],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// 🚀 Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (
        (to.meta.requiresGuest || to.path === '/login') &&
        isAuthenticated
    ) {
        next('/app/dashboard');
    } else {
        next();
    }
});

export default router;
