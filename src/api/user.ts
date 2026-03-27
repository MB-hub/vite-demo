// import { post, get } from '@/http/request';

// 定义的接口
// export const userLogin = async (data?: LoginRequest) => {
//     return post<LoginResponse>({}, '/login', data);
// };

// export const refresUserInfo = async (data?: reLoginRequest) => {
//     return post<LoginResponse>({}, '/refresh', data);
// };
// // 获取所有的用户
// export const getUserList = () => {
//     return get({}, '/getUserList')
// };

export type LoginRequest = {
    username: string;
    password: string;
};

// 刷新登陆信息需要的参数
export type reLoginRequest = {
    accessToken: string;
};

export type LoginResponse = {
    username: string;
    roles: string[];
    accessToken: string;
};

import service from '@/http/request';

export function userLogin(data?: LoginRequest) {
    return service({
        url: '/login',
        method: 'post',
        data
    });
}

// 获取所有的用户
export function getUserList(data) {
    return service({
        url: '/getUserList',
        method: 'get',
        data
    });
}
