<template>
	<div class="login-container">
		<div class="login-box">
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/logo.png" alt="" />
					<p class="logo-text">Geeker-Admin</p>
				</div>
				<LoginForm />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import LoginForm from './components/login-form.vue';
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
