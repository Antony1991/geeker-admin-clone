<!--
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-21 20:08:04
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-22 12:50:02
 * @FilePath: /geeker-admin-clone/src/views/proTable/components/user-drawer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-drawer
		v-model="submitParam.visible"
		:close-on-click-modal="false"
		destroy-on-close
		size="600px"
		:title="`${drawerData.title}用户`"
	>
		<el-form ref="drawerForm" :rules="ruleForm" :model="drawerData.rowData" label-width="100px" :disabled="drawerData.isView">
			<el-form-item label="用户名：" prop="username">
				<el-input v-model="drawerData.rowData.username" clearable placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item label="性别：" prop="gender">
				<el-select v-model="drawerData.rowData.gender">
					<el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="身份证号：" prop="idCard">
				<el-input v-model="drawerData.rowData.idCard" clearable placeholder="请输入身份证号" />
			</el-form-item>
			<el-form-item label="邮箱：" prop="email">
				<el-input v-model="drawerData.rowData.email" clearable placeholder="请输入邮箱" />
			</el-form-item>
			<el-form-item label="居住地址：" prop="address">
				<el-input v-model="drawerData.rowData.address" clearable placeholder="请输入居住地址" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="cancle" class="user-button">取消</el-button>
			<el-button
				:loading="submitParam.loading"
				v-show="!drawerData.isView"
				type="primary"
				class="user-button"
				@click="handleSubmit"
				>提交</el-button
			>
		</template>
	</el-drawer>
</template>
<script setup lang="ts">
import { User } from '@/models/user';
import { reactive, ref } from 'vue';
import { genderType } from '@/config/mapping';
import { ElMessage, FormInstance } from 'element-plus';
interface DrawerProps {
	title: string;
	rowData?: User.ResUserList;
	isView: boolean;
	apiUrl?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}
const ruleForm = reactive({
	username: [{ required: true, message: '请填写用户姓名', trigger: 'blur' }],
	gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
	idCard: [{ required: true, message: '请填写身份证号', trigger: 'blur' }],
	email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
	address: [{ required: true, message: '请填写居住地址', trigger: 'blur' }]
});
const submitParam = reactive<{ visible: boolean; loading: boolean }>({
	visible: false,
	loading: false
});
const drawerData = ref<DrawerProps>({
	title: '',
	isView: false
});
const drawerForm = ref<FormInstance>();
// methods
/**
 * @description: 提交form
 * @return {*}
 */
const handleSubmit = () => {
	drawerForm.value!.validate(async isValid => {
		if (isValid) {
			if (!drawerData.value.apiUrl) {
				return ElMessage.warning(`未配置提交接口 , apiUrl：`, drawerData.value.apiUrl);
			}
			submitParam.loading = true;
			await drawerData.value.apiUrl(drawerData.value.rowData);
			submitParam.loading = false;
			ElMessage.success('操作成功');
			if (drawerData.value.getTableList) {
				drawerData.value.getTableList();
			}
			submitParam.visible = false;
		}
	});
};

/**
 * @description: 取消的方法
 * @return {*} void
 */
const cancle = () => {
	submitParam.visible = false;
};
/**
 * @description: 暴露出去的方法
 * @param {*} params
 * @return {*} void
 */
const acceptParams = (params: DrawerProps) => {
	drawerData.value = params;
	submitParam.visible = true;
};
defineExpose({
	acceptParams
});
</script>
<style lang="scss" scoped>
@import '../hooks-table/index.scss';
</style>
