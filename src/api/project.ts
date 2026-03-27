// import { get } from '@/http/request';
// export const getProjectList =async (data: any) => {
//   return get({}, '/projects', data)
// }

import service from '@/http/request';

export function getProjectList(data) {
    return service({
        url: '/projects',
        method: 'get',
        data
    });
}
