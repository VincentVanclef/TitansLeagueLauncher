import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { HomeRoutes } from './routes/home.routes';
import { UserRoutes } from './routes/user.routes';
import { UserModule } from '@/store/modules/user/user.store';

Vue.use(VueRouter);

const PageNotFoundRoute: RouteConfig = {
	path: '*',
	name: 'Page Not found',
	redirect: '/'
};

const router = new VueRouter({
	mode: process.env.IS_ELECTRON ? 'hash' : 'history',
	base: process.env.BASE_URL,
	routes: [PageNotFoundRoute, ...HomeRoutes, UserRoutes]
});

router.beforeEach((to, from, next) => {
	const requiresAuth: boolean = to.meta.requiresAuth;

	// check for authentication
	if (requiresAuth && !UserModule.IsLoggedIn) {
		console.log('test');
		next('/user/login');
		UserModule.Logout();
		return;
	}

	next();
});

export default router;
