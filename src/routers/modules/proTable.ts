import { RouteRecordRaw } from 'vue-router';
import Layout from '@/views/layout/index.vue';

export const proTableRouter: Array<RouteRecordRaw> = [
	{
		path: '/proTable',
		component: Layout,
		redirect: '/proTable/useHooks',
		children: [
			{
				path: 'useHooks',
				name: 'useHooks',
				component: () => import('@/views/proTable/hooks-table/index.vue'),
				meta: {
					keepAlive: true,
					title: '使用 Hooks',
					key: 'hooksTable'
				}
			}
		]
	}
];
