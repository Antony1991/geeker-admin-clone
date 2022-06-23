/*
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-19 21:05:13
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-20 21:11:12
 * @FilePath: /geeker-admin-clone/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description 使用递归处理路由菜单，生成一维数组
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: any[], newArr: string[] = []) {
	routerList.forEach((item: any) => {
		if (typeof item === 'object' && item.path) {
			newArr.push(item.path);
		}
		if (item.children && item.children.length) {
			handleRouter(item.children, newArr);
		}
	});
	return newArr;
}

export function defaultFormat(row: number, col: number, callValue: any) {
	// 如果当前值为数组，使用/拼接
	if (Array.isArray(callValue)) {
		return callValue.length ? callValue.join(' / ') : '--';
	}
	return callValue ?? '--';
}
