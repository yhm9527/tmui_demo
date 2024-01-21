<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 20:12:04
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-21 21:49:03
 * @FilePath: \tmui_demo\src\pages\search\search.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import {} from "vue"
    import FormData from "./components/FormData.vue"
    import TakeStockItem from "./components/TakeStockItem.vue"

    const query = () => {
        console.log("查询")
    }
</script>
<script lang="ts">
    export default {
        name: "Search",
    }
</script>
<template>
    <tm-app _class="flex">
        <tm-navbar title="盘点查询" />
        <!-- 查询条件 可折叠 -->
        <tm-collapse
            class="mb-12"
            :defaultActiveKey="['1']"
        >
            <tm-collapse-item
                title="筛选"
                name="1"
                activeColor="green"
            >
                <template #rightLabel>
                    <tm-button
                        label="查询"
                        size="small"
                        color="green"
                        @click.stop="query"
                    ></tm-button>
                </template>
                <view style="background: #fff">
                    <form-data></form-data>
                </view>
            </tm-collapse-item>
        </tm-collapse>
        <!-- 列表 -->
        <take-stock-item
            v-for="i in 10"
            :key="i"
        ></take-stock-item>
    </tm-app>
</template>

<style lang="scss" scoped></style>
