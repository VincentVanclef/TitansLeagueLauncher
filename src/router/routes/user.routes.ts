import { RouteConfig } from 'vue-router';
import Index from '@/views/user/Index.vue';
import Login from '@/views/user/Login.vue';
import Profile from '@/views/user/Profile.vue';
import Register from '@/views/user/Register.vue';
import Vote from '@/views/user/Vote.vue';

export const UserRoutes: RouteConfig = {
	path: '/user',
	name: 'User',
	component: Index,
	meta: {
		requiresAuth: true
	},
	children: [
		{
			path: '/user/login',
			name: 'Login',
			component: Login,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/user/profile',
			name: 'Profile',
			component: Profile,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/user/register',
			name: 'Register',
			component: Register,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/user/vote',
			name: 'Vote',
			component: Vote,
			meta: {
				requiresAuth: true
			}
		}
	]
};
