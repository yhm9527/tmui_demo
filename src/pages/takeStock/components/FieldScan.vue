<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 16:23:31
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-22 22:34:16
 * @FilePath: \tmui_demo\src\pages\takeStock\components\FieldScan.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, onUnmounted, inject, nextTick, watch } from "vue"
    import { TakeStockFormDataKey } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    const formData = inject(TakeStockFormDataKey)
    const value = ref("")
    const focusFlag = ref(false)
    const show = ref(false)
    const openScan = () => {
        // #ifdef H5
        value.value = "A13348514069"
        confirm()
        // #endif
        show.value = true
        nextTick(() => {
            focusFlag.value = true
        })
    }

    const closeScan = () => {
        focusFlag.value = false
        show.value = false
    }
    const focus = () => {
        uni.hideKeyboard()
    }
    // #ifdef APP-PLUS
    uni.onKeyboardHeightChange((res) => {
        if (show.value && res.height > 0) {
            uni.hideKeyboard()
        }
    })
    // #endif

    let params = {
        djbh: "",
        uname: "",
        rq: "",
        ckdm: "",
        kwdm: "",
        userid: "",
        djlx: "",
        sptm: "",
        sl: 1,
    }
    const req = useFetch(DEFAULT_API + "/Work/Savepd", {
        ...DEFAULT_FETCH_CONFIG,
        method: "POST",
        data: params,
    })

    const confirm = () => {
        params.djbh = formData?.value.djbh as string
        params.ckdm = formData?.value.ckdm as string
        params.kwdm = formData?.value.kwdm as string
        params.rq = formData?.value.rq as string
        params.userid = formData?.value.userid as string
        params.djlx = formData?.value.djlx as string
        params.uname = formData?.value.uname as string
        params.sptm = value.value
        req.getData()
        value.value = ""
        focusFlag.value = false
        setTimeout(() => {
            focusFlag.value = true
        }, 200)
    }

    watch(
        () => req.data.value,
        (newVal) => {
            console.log(req.data.value)
            if (newVal?.status == 200) {
                // success
                uni.showToast({
                    title: req.data.value?.msg || '成功',
                    icon: "success",
                })
            } else {
                // fail
                uni.showToast({
                    title: req.data.value?.msg || '失败',
                    icon: "error",
                })
            }
        }
    )
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
        color="green"
        label="开启扫码"
    ></tm-button>
    <tm-overlay
        v-model:show="show"
        contentAnimation
        :overlayClick="false"
    >
        <view @click.stop="">
            <tm-sheet
                :width="500"
                :height="500"
            >
                <tm-input
                    style="position: absolute; z-index: -1"
                    :focus="focusFlag"
                    :autoBlur="false"
                    placeholder="自动聚焦"
                    v-model="value"
                    @confirm="confirm"
                    @focus="focus"
                ></tm-input>
                <tm-result
                    color="green"
                    status="success"
                    :clickDisabled="false"
                    title="已开启扫码"
                    sub-title="请使用"
                    btnText="关闭扫码"
                    @click="closeScan"
                ></tm-result>
            </tm-sheet>
        </view>
    </tm-overlay>
</template>

<style lang="scss" scoped></style>
