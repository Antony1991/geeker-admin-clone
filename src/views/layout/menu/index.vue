<template>
	<div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
		<Logo :is-collapse="isCollapse" />
		<el-scrollbar>
			<el-menu
				:default-active="activeMenu"
				:router="true"
				:unique-opened="true"
				:collapse-transition="false"
				:collapse="isCollapse"
			>
				<SubItem :menuList="menuList" />
			</el-menu>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMenuStore } from '@/pinia/menu';
import SubItem from './components/SubItem.vue';
import Logo from './components/logo.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/pinia/auth';
import { useRoute } from 'vue-router';
const route = useRoute();
const menuStore = useMenuStore();
const authStore = useAuthStore();
const { isCollapse, menuList } = storeToRefs(menuStore);

const activeMenu = computed((): string => route.path);
onMounted(() => {
	menuStore.getMenus();
	console.log('....auth', authStore.authRouter);
});
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
