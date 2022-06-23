import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { dataScreenRouter, homeRouter, proTableRouter } from './modules';
// * 导入所有router
// const metaRouters = import.meta.globEager("./modules/*.ts")
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: { name: 'login' }
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录页',
			key: 'login'
		}
	},
	...dataScreenRouter,
	...homeRouter,
	...proTableRouter,
	{
		// 404
		path: '/:pathMatch(.*)',
		redirect: { name: '404' }
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 })
});
export default router;
