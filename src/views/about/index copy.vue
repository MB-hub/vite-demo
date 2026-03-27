<template>
    <div class="wrap-about">
        <ElForm ref="formRef">111</ElForm>
    </div>
</template>
<script setup lang="ts">
// import { ref } from 'vue'
import { ElForm } from 'element-plus';
import { useCompRef } from '@/hooks/useCompRef';
// const formRef = ref<InstanceType<typeof ElForm>>()
const formRef = useCompRef<typeof ElForm>();
formRef.value?.validate((valid) => {
    console.log(valid, 'valid');
});
</script>
<style lang="less" scoped>
// @import '@/styles/variable.less'; // vite.config.ts 中配置了全局变量，可以直接使用
.wrap-about {
    color: @color;
    background: @bg;
}
</style>
