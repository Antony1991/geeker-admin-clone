/*
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-19 15:15:03
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-20 21:18:40
 * @FilePath: /geeker-admin-clone/src/service/api/login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Login } from '@/models/login';
import http from '@/service';
import { PORT1 } from '../config/servicePort';
/**
 * @name 登录模块
 */
// * 用户登录接口
export function loginApi(params: Login.ReqLoginform) {
	return http.post<Login.ResLogin>(PORT1 + '/login', params);
}

// * 获取菜单列表
export const getMenuList = () => {
	return http.get<any[]>(PORT1 + '/menu/list');
};
