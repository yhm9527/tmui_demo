<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 16:23:31
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-23 16:05:27
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\components\FieldScan.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, inject, nextTick, watch } from "vue"
    import { TakeStockFormDataKey, CountKey } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    import TkInput from "@/uni_modules/tk-input/components/tk-input/tk-input.vue"
    const formData = inject(TakeStockFormDataKey)
    const count = inject(CountKey)
    const value = ref("")
    const show = ref(false)
    const inputRef = ref<InstanceType<typeof TkInput>>()
    const openScan = () => {
        // #ifdef H5
        value.value = "A13348514069"
        confirm()
        // #endif
        show.value = true
        nextTick(() => {
            // 输入框聚焦
            inputRef.value?.focus()
        })
    }

    const closeScan = () => {
        // 输入框失焦
        inputRef.value?.blur()
        show.value = false
    }

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
    }

    watch(
        () => req.data.value,
        (newVal) => {
            console.log(req.data.value)
            if (newVal?.status == 200) {
                if (count) {
                    count.value.number = newVal?.data?.sl
                    count.value.size = newVal?.data?.ks
                }
                // success
                uni.showToast({
                    title: req.data.value?.msg || "成功",
                    icon: "success",
                })
            } else {
                // fail
                uni.showToast({
                    title: req.data.value?.msg || "失败",
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
                <tk-input
                    ref="inputRef"
                    :style="{ zIndex: '-1', position: 'absolute' }"
                    :allowEdit="true"
                    v-model="value"
                    @confirm="confirm"
                />
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
