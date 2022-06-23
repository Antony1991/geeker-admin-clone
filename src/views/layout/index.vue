<!--
 * @Author: antonyli antonyli8899@gmail.com
 * @Date: 2022-06-19 17:11:16
 * @LastEditors: antonyli antonyli8899@gmail.com
 * @LastEditTime: 2022-06-21 18:40:42
 * @FilePath: /geeker-admin-clone/src/views/layout/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-container>
		<el-aside>
			<Menu></Menu>
		</el-aside>
		<el-container>
			<el-header>
				<Header />
			</el-header>
			<el-main>
				<section class="main-box">
					<router-view v-slot="{ Component, route }">
						<transition name="fade-transform" mode="out-in">
							<keep-alive>
								<component :is="Component" :key="route.path" />
							</keep-alive>
						</transition>
					</router-view>
				</section>
			</el-main>
		</el-container>
	</el-container>
</template>
<script setup lang="ts">
import Menu from './menu/index.vue';
import Header from './header/index.vue';
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
