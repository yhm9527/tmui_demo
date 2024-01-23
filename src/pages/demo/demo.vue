<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-09 14:32:52
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-23 15:51:25
 * @FilePath: \tmui_cli_demo\src\pages\demo\demo.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, watch } from "vue"
    import TkInput from "@/uni_modules/tk-input/components/tk-input/tk-input.vue"
    const goCrop = () => {
        uni.navigateTo({ url: "/pages/crop/crop" })
    }
    const goHideKeyboard = () => {
        uni.navigateTo({ url: "/pages/hideKeyboard/hideKeyboard" })
    }
    const inputRef = ref<InstanceType<typeof TkInput>>()
    const value = ref("")
    const onInput = (event: any) => {
        console.log("onInput", event)
    }
    const onConfirm = (event: any) => {
        console.log("onConfirm", event)
    }
    watch(
        () => inputRef.value,
        (val) => {
            console.log("inputRef", val)
            val.focus()
            setTimeout(() => {
                value.value = "测试input聚焦不显示键盘"
                setTimeout(() => {
                    value.value = ""
                },1000)
            }, 1000);
        }
    )
</script>

<template>
    <tm-app>
        <tm-navbar
            title="DEMO"
            hide-back
            hide-home
        >
        </tm-navbar>
        <tm-sheet>
            <tm-button
                @click="goCrop"
                label="裁剪"
            ></tm-button>
            <tm-button
                @click="goHideKeyboard"
                label="隐藏键盘"
            ></tm-button>
        </tm-sheet>
        <tm-sheet>
            <tm-text
                :font-size="24"
                _class="text-weight-b"
                label="测试input聚焦不显示键盘"
            ></tm-text>
            <tm-divider></tm-divider>
            <tk-input
                ref="inputRef"
                :allowEdit="true"
                @input="onInput"
                v-model="value"
                @confirm="onConfirm"
            />
        </tm-sheet>
    </tm-app>
</template>

<style lang="scss" scoped></style>
