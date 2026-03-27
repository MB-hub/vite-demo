import { defineStore } from 'pinia';
import pinia from '@/store';
import { userLogin } from '@/api/user';
import { UserState } from './types';

export const useUserStoreHook = defineStore('userInfo', {
    // 其他配置...
    state: (): UserState => {
        return {
            username: '张梦波',
            accessToken: '',
            roles: ['common']
        };
    },
    getters: {},
    actions: {
        // 用户登录方法
        storeUserLogin(data: any) {
            // 调用登录接口并更新用户名
            return userLogin(data).then((res) => {
                this.username = res.username; // 设置登录后的用户名
                this.roles = res.roles; // 设置登录后的角色
                this.accessToken = res.accessToken; // 设置登录后的访问令牌
                return res; // 返回登录结果，以便在调用处使用
            });
        }
    },
    persist: {
        key: 'userInfo',
        storage: sessionStorage,
        pick: ['accessToken', 'username']
        // paths: ['accessToken', 'username']
    }
});
export function useUserStore() {
    return useUserStoreHook(pinia); // 返回用户状态存储实例
}
