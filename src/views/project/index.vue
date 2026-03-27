<template>
    <div class="wrap-content">
        <el-form :inline="true" label="名称" :model="searchData" class="search-form">
            <el-form-item label="项目名称">
                <el-input v-model="searchData.title" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目详情">
                <el-input v-model="searchData.introduce" placeholder="请输入项目详情"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="title" label="名称" width="180"></el-table-column>
            <el-table-column prop="introduce" label="详情"></el-table-column>
        </el-table>
        <el-pagination
            class="pagination"
            background
            layout="sizes,prev, pager, next"
            :total="searchData.dataCount"
            :page-sizes="[5, 10, 15, 20]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        >
        </el-pagination>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, computed, watch } from 'vue';
import { getProjectList } from '@/api/project';
interface IProject {
    userId: number; // 项目
    id: number; // 项目id
    title: string; // 项目标题
    introduce: string; // 项目介绍
}
// 项目list数据 数组使用ref包裹定义
let projectList = ref<IProject[]>([]);

let searchData = reactive({
    userId: 0,
    id: 0,
    title: '',
    introduce: '',
    currentPage: 1,
    dataCount: 0,
    pageSize: 5
});
const data = reactive({}) as IProject[];

// 计算属性, 切割出实际上需要展示的数据
let dataList = computed(() => {
    return projectList.value.slice(
        (searchData.currentPage - 1) * searchData.pageSize,
        searchData.currentPage * searchData.pageSize
    );
});
// 改变当前页码
const handleCurrentChange = (page: number) => {
    searchData.currentPage = page;
};
// 改变每页显示多少条数据
const handleSizeChange = (pageSize: number) => {
    searchData.pageSize = pageSize;
};
// 解决搜索的问题
watch([() => searchData.title, () => searchData.introduce], () => {
    if (!searchData.title && !searchData.introduce) {
        fetchData();
    }
});
const handleSearch = () => {
    let res: IProject[] = [];
    if (searchData.title || searchData.introduce) {
        if (searchData.title) {
            res = projectList.value.filter((item) => {
                return item.title.indexOf(searchData.title) !== -1;
            });
        }
        if (searchData.introduce) {
            res = projectList.value.filter((item) => {
                return item.introduce.indexOf(searchData.introduce) !== -1;
            });
        }
    } else {
        res = projectList.value;
    }
    projectList.value = res;
    searchData.currentPage = 1;
    searchData.dataCount = projectList.value.length;
};
const fetchData = () => {
    getProjectList({}).then((res) => {
        projectList.value = res.data;
        searchData.dataCount = res.data.length;
    });
};
onMounted(() => {
    fetchData();
});
</script>
<style lang="less" scoped>
.wrap-content {
    display: flex;
    height: max-content;
    flex-direction: column;

    .pagination {
        display: flex;
        // justify-content: right;
        // align-items: right;
        margin: 10px;
    }
}
</style>

