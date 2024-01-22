<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-18 21:13:45
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-22 14:25:20
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\takeStock.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, provide } from "vue"
    import { TakeStockFormDataKey } from "./InjectionKey"
    import FormData from "./components/FormData.vue"
    import Entering from "./components/Entering.vue"
    const formData = ref({
        djbh: "",
        uname: "",
        rq: "",
        ckdm: "",
        kwdm: "",
        sptm: "",
        userid: "",
        djlx: "",
    })
    provide(TakeStockFormDataKey, formData)
    const userInfo = uni.getStorageSync("userInfo")
    formData.value.userid = userInfo.Dydm
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
        <!-- 手动录入 -->
        <entering></entering>
    </tm-app>
</template>

<style lang="scss" scoped></style>
