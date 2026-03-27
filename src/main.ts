import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import './styles/index.less';
// import tag from '@/views/about/tag.vue'
// element-plus 整体引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(pinia);
// app.component('user-parent', tag)  // 注册全局组件
app.use(router)
app.mount('#app');
