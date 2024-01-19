<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-18 21:13:45
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-19 14:53:51
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\takeStock.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
import {} from "vue"
import FormData from "./components/FormData.vue"
</script>
<script lang="ts">
    export default {
        name: "TakeStock",
    }
</script>
<template>
    <tm-app>
        <tm-navbar title="盘点" />
        <form-data></form-data>
        <tm-sheet :margin="[24,0,24,24]" :round="[5]">

        </tm-sheet>
    </tm-app>
</template>

<style lang="scss" scoped>
</style>

