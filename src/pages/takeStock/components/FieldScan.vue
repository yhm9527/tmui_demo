<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 16:23:31
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-25 17:14:05
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\components\FieldScan.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, inject, nextTick, watch } from "vue"
    import { TakeStockFormDataKey, CountKey } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"
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

    const req = useFetch(config.API + "/Work/Savepd", {
        ...config.DEFAULT_FETCH_CONFIG,
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
    }

    watch(
        () => req.data.value,
        (newVal) => {
            value.value = ""
            if (newVal?.status == 200) {
                if (count) {
                    count.value.number = newVal?.data?.sl
                    count.value.size = newVal?.data?.ks
                    count.value.latestShop = newVal?.data?.spxx
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

    // #ifdef APP-PLUS
    uni.onKeyboardHeightChange((res) => {
        if (show.value && res.height > 0) {
            uni.hideKeyboard()
        }
    })
    // #endif
</script>
<script lang="ts">
    export default {
        name: "FormScan",
    }
</script>
<template>
    <tk-input
        ref="inputRef"
        :style="{ border: '1rpx solid green', padding: '5rpx' }"
        v-model="value"
        @confirm="confirm"
    />
    <!-- <tm-button
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
                    v-if="show"
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
                    :sub-title="`数量${count?.number}/款数${count?.size}`"
                    btnText="关闭扫码"
                    @click="closeScan"
                ></tm-result>
            </tm-sheet>
        </view>
    </tm-overlay> -->
</template>

<style lang="scss" scoped></style>
