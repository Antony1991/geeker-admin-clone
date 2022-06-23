<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children && subItem.children.length" :index="subItem.path">
			<template #title>
				<el-icon>
					<component :is="subItem.icon" />
				</el-icon>
				<span>{{ subItem.title }}</span>
			</template>
			<SubItem :menuList="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.path">
			<el-icon>
				<component :is="subItem.icon" />
			</el-icon>
			<template #title v-if="!subItem.isLink">
				<span>{{ subItem.title }}</span>
			</template>
			<template #title v-else>
				<a class="href" :href="subItem.isLink" target="_blank">{{ subItem.title }}</a>
			</template>
		</el-menu-item>
	</template>
</template>
<script lang="ts" setup>
defineProps<{ menuList: any[] }>();
</script>
<style lang="scss" scoped>
@import '../index.scss';
</style>
