<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 16:23:31
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-28 09:42:13
 * @FilePath: \tmui_demo\src\pages\takeStock\components\FieldScan.vue
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

    const state = ref(false)

    watch(
        () => state.value,
        (newVal) => {
            params.sl = newVal ? -1 : 1
            console.log("params", params)
        }
    )

    const req = useFetch(config.API + "/Work/Savepd", {
        ...config.DEFAULT_FETCH_CONFIG,
        method: "POST",
        data: params,
    })

    const confirm = (val: string) => {
        if(val){
            value.value = val
        }
        params.djbh = formData?.value.djbh as string
        params.ckdm = formData?.value.ckdm as string
        params.kwdm = formData?.value.kwdm as string
        params.rq = formData?.value.rq as string
        params.userid = formData?.value.userid as string
        params.djlx = formData?.value.djlx as string
        params.uname = formData?.value.uname as string
        params.sptm = value.value
        console.log("params", params)

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
        :style="{
            width: '300rpx',
            border: '1rpx solid green',
            padding: '5rpx',
        }"
        v-model="value"
        @confirm="confirm"
    />
    <tm-switch
        v-model="state"
        :defaultValue="state"
        :margin="[10, 0, 0, 0]"
        unCheckedColor="red"
        color="green"
        text
        :label="['开', '关']"
    ></tm-switch>
</template>

<style lang="scss" scoped></style>
