// import { get } from '@/http/request';
// export const getAuthList = async (data: any) => {
//   return get({}, '/getAuthList', data)
// }

import service from '@/http/request';
// 角色列表接口
export function getAuthList(data) {
    return service({
        url: '/getAuthList',
        method: 'get', // post put delete
        data
    });
}
