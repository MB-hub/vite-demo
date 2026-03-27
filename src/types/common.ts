// 角色接口
export interface IRole {
    role: number; // 角色编号
    roleName: string; // 角色名称
}
// 用户接口
export interface IUser {
    id: number; // 编号
    nickName: string; // 姓名
    userName: string; // 用户名
    role: IRole[]; // 角色
}
// 有权限的角色接口
export interface IRoleWithAuth {
    roleId: number;
    role: number; // 角色编号
    roleName: string; // 角色名称
    auth: []; // 权限
}
// 用户查询接口
export interface IQueryUser {
    nickName: string; // 姓名
    role: number; // 角色编号
}
// 用户编辑接口
export interface IEditUser {
    id: number; // 编号
    nickName: string; // 姓名
    role: number[]; // 角色
}
