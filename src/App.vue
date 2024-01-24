<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-09 14:32:52
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-24 21:56:54
 * @FilePath: \tmui_demo\src\App.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<template></template>
<script lang="ts" setup>
    // #ifdef APP-PLUS
    console.log("SystemInfoSync设备信息", uni.getSystemInfoSync())
    // #endif
</script>
<style>
    /* #ifdef APP-PLUS-NVUE */
    @import "./tmui/scss/nvue.css";
    /* #endif */
    /* #ifndef APP-PLUS-NVUE */
    @import "./tmui/scss/noNvue.css";
    /* #endif */
</style>
