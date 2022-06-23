/*
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-20 20:36:57
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-20 20:49:23
 * @FilePath: /geeker-admin-clone/src/service/api/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { User } from '@/models/user';
import http from '@/service';
import { PORT1 } from '../config/servicePort';

/**
 * @description: 获取用户列表
 * @param {User} params
 * @return {*}
 */
export function getUserList(params: User.ReqGetUserParams) {
	return http.post<User.ResUserList>(PORT1 + `/user/list`, params);
}

/**
 * @description: 新增用户
 * @param {object} params
 * @return {*}
 */
export function addUser(params: { id: string }) {
	return http.post<User.ResUserList>(PORT1 + `/user/add`, params);
}
/**
 * @description: 编辑用户
 * @param {object} params
 * @return {*}
 */
export function updateUser(params: { id: string }) {
	return http.post<User.ResUserList>(PORT1 + `/user/edit`, params);
}
/**
 * @description: 删除用户
 * @param {object} params
 * @return {*}
 */
export function deleteUser(params: { id: string }) {
	return http.post<User.ResUserList>(PORT1 + `/user/delete`, params);
}
/**
 * @description: 切换用户状态
 * @param {object} params
 * @return {*}
 */
export function switchUserStatus(params: { id: string }) {
	return http.post<User.ResUserList>(PORT1 + `/user/change`, params);
}
