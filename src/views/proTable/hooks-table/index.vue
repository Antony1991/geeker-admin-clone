<!--
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-20 15:44:18
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-23 21:32:06
 * @FilePath: /geeker-admin-clone/src/views/proTable/hooks-table/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="table-box">
		<div class="table-search">
			<el-form :model="searchParam" :inline="true" label-width="100px">
				<el-form-item label="用户姓名：">
					<el-input v-model="searchParam.username" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="性别：">
					<el-select v-model="searchParam.gender">
						<el-option v-for="item in allGener" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号：">
					<el-input v-model="searchParam.idCard" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="邮箱：">
					<el-input v-model="searchParam.email" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">筛选</el-button>
					<el-button type="primary" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
			<div class="table-header">
				<div class="table-header__lf">
					<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增', { gender: 1 })">新增用户</el-button>
					<el-button type="danger" :icon="CirclePlus">批量添加用户</el-button>
					<el-button type="danger" :icon="Delete" :disabled="selectedIds.length === 0" @click="batchDelete"
						>批量删除用户</el-button
					>
				</div>
				<div class="table-header__rt">
					<el-button :icon="Refresh" circle @click="search"> </el-button>
				</div>
			</div>
			<el-table border :data="tableData" v-loading="loading" @selection-change="selectionChange" :row-key="getRowKeys">
				<el-table-column type="selection" width="80" align="center" />
				<el-table-column prop="username" label="用户姓名" align="center" show-overflow-tooltip width="140"> </el-table-column>
				<el-table-column prop="gender" label="性别" align="center" show-overflow-tooltip width="140" v-slot="scope">
					{{ scope.row.gender == 1 ? '男' : '女' }}
				</el-table-column>
				<el-table-column
					prop="idCard"
					label="身份证号"
					align="center"
					:formatter="defaultFormat"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="email"
					label="邮箱"
					align="center"
					:formatter="defaultFormat"
					show-overflow-tooltip
					width="240"
				></el-table-column>
				<el-table-column
					prop="address"
					label="居住地址"
					align="center"
					:formatter="defaultFormat"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip width="200"> </el-table-column>
				<el-table-column label="操作" fixed="right" width="330" v-slot="scope">
					<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
					<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
				</el-table-column>
			</el-table>
			<div class="table-pagination">
				<el-pagination
					:currentPage="pageable.pageNum"
					:page-size="pageable.pageSize"
					:page-sizes="[10, 25, 50, 100]"
					background
					layout="total, sizes, prev, pager, next, jumper"
					:total="pageable.total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				></el-pagination>
			</div>
		</div>
		<UserDrawer ref="userDrawerRef" />
	</div>
</template>
<script lang="ts" setup>
import { useTable } from '@/hooks/useTable';
import { useSelection } from '@/hooks/useSelection';
import { useHandleData } from '@/hooks/useHandleData';
import { useUserStore } from '@/pinia/user';
import { genderType } from '@/config/mapping';
import UserDrawer from '../components/UserDrawer.vue';
// import { getUserList } from '@/service/api/user';
import { CirclePlus, Refresh, View, EditPen, Delete } from '@element-plus/icons-vue';
import { defaultFormat } from '@/utils';
import { ref } from 'vue';
import { User } from '@/models/user';
import { addUser, deleteUser, updateUser } from '@/service/api/user';
const userStore = useUserStore();
const userDrawerRef = ref<{
	acceptParams: (params: any) => void;
}>();
// const initParam = reactive({
// });
const { loading, searchParam, tableData, handleSizeChange, handleCurrentChange, pageable, search, reset } = useTable(
	async (values: any): Promise<any> => {
		const res = await userStore.getUserList(values);
		return res.data;
	}
	// initParam
);
const { selectionChange, getRowKeys, selectedIds } = useSelection();
const allGener = ref([{ value: -1, label: '全部' }, ...genderType]);

// 打开新增编辑弹窗
const openDrawer = (title: string, rowData: Partial<User.ResUserList> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === '查看',
		apiUrl: title === '新增' ? addUser : title === '编辑' ? updateUser : '',
		getTableList: search
	};
	userDrawerRef.value!.acceptParams(params);
};

/**
 * @description: 批量删除
 * @return {*}
 */
const batchDelete = async () => {
	await useHandleData({
		api: deleteUser,
		params: { id: selectedIds.value },
		message: '您确定要删除当前用户信息吗？'
	});
	search();
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
