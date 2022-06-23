/*
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-20 20:52:16
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-21 10:25:44
 * @FilePath: /geeker-admin-clone/src/pinia/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getUserList } from '@/service/api/user';
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
	id: 'userState',
	state: () => ({
		userList: []
	}),
	actions: {
		async getUserList(params: any) {
			const res = await getUserList(params);
			return res;
		}
	}
});
