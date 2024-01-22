<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 16:23:31
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-22 11:08:28
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\components\FieldScan.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, onUnmounted } from "vue"

    const value = ref("")
    const focusFlag = ref(false)
    let intervalId: any
    let timeoutId: any
    const openScan = () => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        intervalId = setInterval(() => {
            uni.hideKeyboard()
        }, 20)
        timeoutId = setTimeout(() => {
            focusFlag.value = !focusFlag.value
        }, 200)
    }
    onUnmounted(() => {
        intervalId && clearInterval(intervalId)
    })
    const confirm = () => {
        console.log("扫描值", value.value)
    }
</script>
<script lang="ts">
    export default {
        name: "FormScan",
    }
</script>
<template>
    <tm-button
        size="small"
        @click="openScan"
        :color="focusFlag ? 'red' : 'green'"
        :label="!focusFlag ? '开启扫码' : '关闭扫码'"
    ></tm-button>
    <view v-show="false">
        <tm-input
            :focus="focusFlag"
            :autoBlur="false"
            placeholder="自动聚焦"
            v-model="value"
            @confirm="confirm"
        ></tm-input>
    </view>
</template>

<style lang="scss" scoped></style>
