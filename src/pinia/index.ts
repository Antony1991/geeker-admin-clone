import { piniaPersistConfig } from '@/utils/piniaPersist';
import { defineStore, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体

export const useGlobalStore = defineStore({
	id: 'globalState',
	state: () => ({
		token: '',
		userInfo: ''
	}),
	actions: {
		setToken(token: string) {
			this.token = token;
		}
	},
	persist: piniaPersistConfig('globalState')
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
