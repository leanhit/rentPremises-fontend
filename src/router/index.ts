import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/public/Login.vue';
import Register from '@/views/public/register/RegistrationForm.vue';
import AdminDashboard from '@/views/private/admin/dashboard/index.vue';
import UserDashboard from '@/views/private/user/index.vue';

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
        path: '/user-dashboard',
        name: 'user-dashboard',
        component: UserDashboard,
        meta: { requiresAuth: true, role: 'USER' },
    },
    {
        path: '/app',
        component: AdminDashboard,
        name: 'LayoutZoter',
        meta: { requiresAuth: true },
        redirect: '/app/redirect-by-role',
        children: [
            {
                path: 'admin-dashboard',
                name: 'admin-dashboard',
                component: AdminDashboard,
                meta: { requiresAuth: true, role: 'ADMIN' },
            },
            {
                path: 'redirect-by-role',
                name: 'redirect-by-role',
                beforeEnter: (to, from, next) => {
                    const role = localStorage.getItem('systemRole');
                    if (role === 'ADMIN') {
                        next({ name: 'admin-dashboard' });
                    } else if (role === 'USER') {
                        next({ name: 'user-dashboard' });
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
    const isAuthenticated = !!localStorage.getItem('accessToken');
    const systemRole = localStorage.getItem('systemRole');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresGuest && isAuthenticated) {
        if (systemRole === 'ADMIN') {
            next('/app/admin-dashboard');
        } else if (systemRole === 'USER') {
            next('/user-dashboard');
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
