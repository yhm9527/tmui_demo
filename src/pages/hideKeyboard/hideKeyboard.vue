<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-15 11:09:38
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-15 14:08:01
 * @FilePath: \tmui_cli_demo\src\pages\hideKeyboard\hideKeyboard.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref } from "vue"
    import { onLoad, onUnload } from "@dcloudio/uni-app"

    const value = ref("")
    const focusFlag = ref(false)
    let intervalId: any
    onLoad(() => {
        intervalId = setInterval(() => {
            uni.hideKeyboard()
        }, 20)
    })
    onUnload(() => {
        console.log("onUnload")
        intervalId && clearInterval(intervalId)
    })
</script>

<template>
    <tm-app>
        <tm-navbar title="隐藏键盘" />
        <tm-sheet>
            <tm-text
                :font-size="24"
                _class="text-weight-b"
                label="自动聚焦"
            ></tm-text>
            <tm-divider></tm-divider>
            <tm-button
                @click="focusFlag = !focusFlag"
                :color="focusFlag ? 'red' : 'green'"
                :label="!focusFlag ? '开启扫码' : '关闭扫码'"
            ></tm-button>
            <view v-show="false">
                <tm-input
                    :focus="focusFlag"
                    :autoBlur="false"
                    placeholder="自动聚焦"
                    v-model="value"
                ></tm-input>
            </view>
            状态 {{ focusFlag }}
        </tm-sheet>
    </tm-app>
</template>

<style lang="scss" scoped></style>
