import { getMenuList } from '@/service/api/login';
import { handleRouter } from '@/utils';
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useMenuStore = defineStore({
	id: 'menuStore',
	state: () => ({
		isCollapse: false,
		menuList: []
	}),
	actions: {
		async getMenus() {
			const authStore = useAuthStore();
			const res = await getMenuList();
			authStore.setAuthRouter(handleRouter(res.data!));
			this.$patch({
				menuList: res.data
			});
		},
		toggleCollapse() {
			this.isCollapse = !this.isCollapse;
		}
	}
});
