export const getMessageInfo = (status: number | string): string => {
    let msg = '';
    switch (status) {
        case 400:
            msg = '请求错误(400)';
            break;
        case 401:
            msg = '未授权(410)';
            break;
        case 403:
            msg = '拒绝访问(403)';
            break;
        case 404:
            msg = '请求错误(404)';
            break;
        case 500:
            msg = '服务器错误(500)';
            break;
        case 503:
            msg = '服务不可用(403)';
            break;
        default:
            msg = `连接出错(${status})!`;
    }
    return `${msg}，请检查网络或联系管理员！`;
};
