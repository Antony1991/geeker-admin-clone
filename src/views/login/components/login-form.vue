<template>
	<el-form ref="loginFormRef" :model="loginForm" size="large" :rules="loginRules">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名：admin / user">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="loginForm.password" placeholder="密码：123456" show-password autocomplete="new-password">
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="login(loginFormRef)" :style="{ width: '100%' }"> 登录 </el-button>
		</el-form-item>
	</el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Login } from '@/models/login';
import type { ElForm } from 'element-plus';
import { loginApi } from '@/service/api/login';
import md5 from 'js-md5';
import { ElMessage } from 'element-plus';
import { useGlobalStore } from '@/pinia';
import { useRouter } from 'vue-router';

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});
const loginForm = reactive<Login.ReqLoginform>({
	username: '',
	password: ''
});
const globalStore = useGlobalStore();
const router = useRouter();
// methods
// 登录
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) {
		return;
	}
	formEl.validate(async valid => {
		if (valid) {
			const params: Login.ReqLoginform = {
				username: loginForm.username,
				password: md5(loginForm.password)
			};
			const res = await loginApi(params);
			globalStore.setToken(res.data!.access_token);
			console.log('-----res', res);
			ElMessage.success('登录成功');
			router.push({ name: 'home' });
		}
	});
};
</script>
