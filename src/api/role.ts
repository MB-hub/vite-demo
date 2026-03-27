// import { get } from '@/http/request';
// export const getRoleList = async (data: any) => {
//   return get({}, '/getRoleList', data)
// }

import service from '@/http/request';

export function getRoleList(data) {
    return service({
        url: '/getRoleList',
        method: 'get',
        data
    });
}
