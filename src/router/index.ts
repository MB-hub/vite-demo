import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // 导入默认样式
import { useSettingStore } from '@/store/setting';
// import { getTitle } from '@/utils'; // 与下方的 getTitle 函数重复，注释掉
// 配置 NProgress
// NProgress.configure({ showSpinner: false });

//配置路由
// const routes:Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     name: "home",
//     component: () => import("../views/home/index.vue"),
//     meta:{},
//     children:[]
//   }
// ];

export const aboutRouter = {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {},
    children: []
} as RouteRecordRaw;

// 组合路由信息
// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
    eager: true
});

//配置路由
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
    const module = modules[key].default;
    routes.push(module);
});
// 添加about路由
routes.push(aboutRouter);
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const noStatusPage = ['/login', '/about'];

export function getTitle(name: string, routes: RouteRecordRaw[] = []) {
    const names: string[] = []
    while (true) {
        names.push(name)
        const currentRouterObj = routes.find(item => item.name === name)
        const parentRouterObj = routes.find(item => item.name === currentRouterObj?.meta?.parentRouter)
        if (parentRouterObj) {
            name = parentRouterObj.name as string
            continue
        } else {
            break
        }
    }
    return names.reverse()
}

const handleRouters = (currentName: string) => {
    console.log(currentName, 'currentName');
    console.log(router.getRoutes(), 'outer.getRoutes()');
    const titles = getTitle(currentName, router.getRoutes())
    const settingStore = useSettingStore();
    settingStore.setTitle(titles)
}
router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    const token = sessionStorage.getItem('userInfo');
    const userLogin = token ? true : false;
    if (userLogin || noStatusPage.includes(_to.path)) {
        next();
    } else {
        next('/login');
    }
    handleRouters(_to.name as string)
});
router.afterEach((_to) => {
    // console.log(_to.path);
    NProgress.done();
});
export default router;
