import { ElMessage, ElMessageBox } from 'element-plus';

/*
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-23 21:18:26
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-23 21:28:46
 * @FilePath: /geeker-admin-clone/src/hooks/useHandleData.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
interface HandleDataProps {
	api: (params: any) => Promise<any>;
	params: any;
	message: string;
	confirmType?: '' | 'success' | 'warning' | 'info' | 'error';
}
export const useHandleData = ({ api, params, message, confirmType = 'warning' }: HandleDataProps) => {
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(message, '温馨提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: confirmType,
			draggable: true
		}).then(async () => {
			const res = await api(params);
			if (!res) return reject(false);
			ElMessage({
				type: 'success',
				message: '操作成功'
			});
			resolve(true);
		});
	});
};
