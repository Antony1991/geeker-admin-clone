<template>
	<el-icon class="collapse-icon" @click="menuStore.toggleCollapse">
		<component :is="isCollapse ? 'expand' : 'fold'" />
	</el-icon>
</template>
<script lang="ts" setup>
import { useMenuStore } from '@/pinia/menu';
import { storeToRefs } from 'pinia';

const menuStore = useMenuStore();
const { isCollapse } = storeToRefs(menuStore);
</script>
