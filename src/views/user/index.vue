<template>
    <div>
        <el-form :inline="true" class="search-form" :model="searchData">
            <el-form-item label="用户名称">
                <el-input v-model="searchData.nickName" placeholder="请输入用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户角色">
                <el-select v-model="searchData.role" class="m-2" style="width: 172px">
                    <el-option :key="0" label="全部" :value="0"></el-option>
                    <el-option
                        v-for="item in roleWithAuthList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="userList" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="nickName" label="姓名"></el-table-column>
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-button v-for="item in scope.row.role" :key="item.role" type="primary" size="small">{{
                        item.roleName
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">操作</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="editShow" title="编辑用户信息">
            <el-form :model="editUser">
                <el-form-item label="用户昵称" label-width="120px">
                    <el-input v-model="editUser.nickName" class="w192" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role" label-width="120px">
                    <el-select v-model="editUser.role" multiple class="m-2 w192" placeholder="请选择角色">
                        <el-option
                            v-for="item in roleWithAuthList"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editShow = false">取 消</el-button>
                    <el-button type="primary" @click="ensureEditUser">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';
import { IQueryUser, IUser, IRoleWithAuth, IEditUser } from '@/types/common';
const searchData = reactive<IQueryUser>({
    nickName: '',
    role: 0
});
let userList = ref<IUser[]>([]);
let roleWithAuthList = ref<IRoleWithAuth[]>([]);
let editShow = ref(false);
let editUser = reactive<IEditUser>({
    id: 0,
    nickName: '',
    role: []
});
onMounted(() => {
    fetchUserList();
    fetchRoleList();
});
const handleSearch = () => {
    let res: IUser[] = [];
    if (searchData.nickName || searchData.role) {
        if (searchData.nickName) {
            res = userList.value.filter((item) => {
                return item.nickName.indexOf(searchData.nickName) !== -1;
            });
        }
        if (searchData.role) {
            res = searchData.nickName ? res : userList.value;
            res = res.filter((item) => {
                return item.role.find((value) => {
                    return value.role === searchData.role;
                });
            });
        }
    } else {
        res = userList.value;
    }
    userList.value = res;
};
const fetchUserList = () => {
    getUserList()
        .then((res) => {
            userList.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};
const fetchRoleList = () => {
    getRoleList({}).then((res) => {
        roleWithAuthList.value = res.data;
    });
};

const handleEdit = (row: IUser) => {
    editShow.value = true;
    Object.assign(editUser, {
        ...row,
        role: row.role.map((item) => item.role)
    });
};
const ensureEditUser = () => {
    console.log(editUser);
    editShow.value = false;
    // 取出来修改的对象
    let obj: IUser = userList.value.find((item) => item.id === editUser.id);
    // 修改了nickName
    obj.nickName = editUser.nickName;
    //  obj.role.splice(0, obj.role.length)  // 清除角色
    obj.role = []; // 清除角色
    console.log(obj);
    roleWithAuthList.value.forEach((element) => {
        if (editUser.role.find((value) => value === element.roleId)) {
            obj.role.push({
                role: element.roleId, // 角色id
                roleName: element.roleName // 角色名称
            });
        }
    });
};
watch([() => searchData.nickName, () => searchData.role], () => {
    if (searchData.nickName === '' && searchData.role === 0) {
        fetchUserList();
    }
});
</script>
<style lang="less" scoped>
.search-form {
    padding: 10px 0 0 10px;
}

.w192 {
    width: 192px;
}
</style>
