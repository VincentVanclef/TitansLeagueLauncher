import { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import ServerStatus from '@/views/ServerStatus.vue';

export const HomeRoutes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/status',
        name: 'Server Status',
        component: ServerStatus,
        meta: {
            requiresAuth: false
        }
    }
];
