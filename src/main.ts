import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/index.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import router from '@/routers';
import * as Icons from '@element-plus/icons-vue';
import pinia from '@/pinia';

const app = createApp(App);
// 注册icon组件
Object.keys(Icons).forEach(name => {
	app.component(name, Icons[name as keyof typeof Icons]);
});
app.use(router).use(pinia).use(ElementPlus).mount('#app');
