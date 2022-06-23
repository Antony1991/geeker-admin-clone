<template>
	<div class="logo flx-center">
		<img src="@/assets/images/logo.png" alt="logo" />
		<span v-show="!isCollapse">Geeker Admin Clone</span>
	</div>
</template>
<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>
<style lang="scss" scoped>
@import '../index.scss';
</style>
