import { AuthState } from '@/models/auth';
import { piniaPersistConfig } from '@/utils/piniaPersist';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
	id: 'authState',
	state: (): AuthState => ({
		authButtons: {},
		authRouter: []
	}),
	actions: {
		setAuthButtons(authBtnList: { [key: string]: any }) {
			this.authButtons = authBtnList;
		},
		setAuthRouter(dynamicRouter: string[]) {
			this.authRouter = dynamicRouter;
		}
	},
	persist: piniaPersistConfig('authState')
});
