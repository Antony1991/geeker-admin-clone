/*
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-20 20:38:58
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-20 20:44:05
 * @FilePath: /geeker-admin-clone/src/models/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// * 用户管理
interface ReqPage {
	pageNum: number;
	pageSize: number;
}
export namespace User {
	export interface ReqGetUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		id: string;
		username: string;
		gender: string;
		age: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		children?: ResUserList[];
	}
}
