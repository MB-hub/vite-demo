<template>
    <div class="wrap-about">
        <tag :text="text" :theme="theme" />
        <tag :text="text" :theme="theme" />
        <tag :text="text" :theme="theme" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const text = ref('张梦波');
const theme = ref('black');
</script>
<style lang="less" scoped>
// @import '@/styles/variable.less'; // vite.config.ts 中配置了全局变量，可以直接使用
.wrap-about {
    color: @color;
    background: @bg;
}
</style>
