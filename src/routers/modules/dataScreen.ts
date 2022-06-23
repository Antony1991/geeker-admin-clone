import { RouteRecordRaw } from 'vue-router';

export const dataScreenRouter: Array<RouteRecordRaw> = [
	{
		path: '/dataScreen',
		name: 'dataScreen',
		component: () => import('@/views/dataScreen/index.vue'),
		meta: {
			title: '数据大屏',
			key: 'dataScreen'
		}
	}
];
