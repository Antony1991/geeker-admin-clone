import { RouteRecordRaw } from 'vue-router';
import Layout from '@/views/layout/index.vue';

// 首页模式
export const homeRouter: Array<RouteRecordRaw> = [
	{
		path: '/home',
		component: Layout,
		redirect: '/home/index',
		children: [
			{
				path: 'index',
				name: 'home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					keepAlive: true,
					title: '首页',
					key: 'home'
				}
			}
		]
	}
];
