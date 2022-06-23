import { PersistedStateOptions } from 'pinia-plugin-persistedstate';

// pinia持久化参数配置
export const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage // 存储
	};
	return persist;
};
