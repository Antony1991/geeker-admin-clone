/*
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-22 15:59:52
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-23 21:07:09
 * @FilePath: /geeker-admin-clone/src/hooks/useSelection.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed, ref } from 'vue';

export const useSelection = () => {
	const isSelect = ref<boolean>(false);
	const selectedList = ref<any[]>([]);

	const selectionChange = (val: any[]) => {
		if (val.length === 0) {
			isSelect.value = false;
		} else {
			isSelect.value = true;
		}
		selectedList.value = val;
	};
	// 获取数据array的 ids
	const selectedIds = computed(() => {
		return selectedList.value.map(item => item.id);
	});
	// 获取行数据的 Key,用来优化 Table 的渲染;在使用跨页多选时,该属性是必填的
	const getRowKeys = (row: { id: string }) => {
		return row.id;
	};
	return {
		getRowKeys,
		isSelect,
		selectedIds,
		selectedList,
		selectionChange
	};
};
