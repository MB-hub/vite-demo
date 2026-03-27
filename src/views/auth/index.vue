<template>
    <div>
        <el-tree
            ref="treeRef"
            :data="authList"
            :check-strictly="true"
            show-checkbox
            :default-checked-keys="checkedNode"
            node-key="roleId"
            :props="{
                children: 'roleList',
                label: 'name'
            }"
        />
        <el-button type="primary" @click="handleChangeAuth">修改权限</el-button>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAuthList } from '@/api/auth';
interface IAuth {
    name: string; // 权限名称
    roleId: number; // 角色id
    roleList?: IAuth[]; // 角色列表 子权限
}
const route = useRoute();
let authList = ref<IAuth[]>([]);
const checkedNode = ref<number[]>([]);
const { query } = route;
if (query.auth) {
    checkedNode.value = query.auth;
}
const treeRef = ref();
onMounted(() => {
    getAuthList({})
        .then((res) => {
            authList.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
});
const handleChangeAuth = () => {
    console.log(treeRef.value.getCheckedKeys());
    const selectedTreeNode = treeRef.value.getCheckedNodes();
};
</script>
<style lang="less" scoped></style>
