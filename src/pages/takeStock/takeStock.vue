<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-18 21:13:45
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-27 23:04:22
 * @FilePath: \tmui_demo\src\pages\takeStock\takeStock.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, provide, watch } from "vue"
    import { onLoad, onShow } from "@dcloudio/uni-app"
    import {
        TakeStockFormDataKey,
        TakeStockGoodsDetailKey,
        CountKey,
    } from "./InjectionKey"
    import FormData from "./components/FormData.vue"
    import Entering from "./components/Entering.vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"

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

    // 统计
    const count = ref({
        // 数量
        number: 0,
        // 款数
        size: 0,
        // 最后一个商品
        latestShop: "",
    })
    provide(CountKey, count)

    const userInfo = uni.getStorageSync("userInfo")
    formData.value.userid = userInfo.Dydm
    formData.value.uname = userInfo.Dymc

    // 商品信息
    const goodsData = ref({
        Spdm: "",
        Spmc: "",
    })
    // 商品尺码列表
    const goodsSizeList = ref<
        {
            Cmdm: string
            Cmmc: string
        }[]
    >([])
    // 商品颜色列表
    const goodsColorList = ref<
        {
            Ysdm: string
            Ysmc: string
        }[]
    >([])
    const reqGoodsDataParams = {
        spdm: "",
    }

    provide(TakeStockGoodsDetailKey, {
        goodsData,
        goodsSizeList,
        goodsColorList,
    })

    // 请求goods
    const reqGoodsData = useFetch(config.API + "/Work/Getspyscmxx", {
        ...config.DEFAULT_FETCH_CONFIG,
        data: reqGoodsDataParams,
    })

    watch(
        () => formData.value.sptm,
        (val) => {
            reqGoodsDataParams.spdm = val
            reqGoodsData.getData()
        }
    )

    watch(
        () => reqGoodsData.data.value,
        (val) => {
            if (val?.status == 200) {
                if(!val?.data?.Objzl){
                    uni.showToast({
                        title: "没有获取到商品信息",
                        icon: "none",
                    })
                }
                goodsData.value.Spmc = val?.data?.Objzl?.Spmc || ""
                goodsData.value.Spdm = val?.data?.Objzl?.Spdm || ""
                goodsSizeList.value = val?.data?.listcm || []
                goodsColorList.value = val?.data?.listys || []
            } else {
                goodsData.value.Spmc = ""
                goodsData.value.Spdm = ""
                goodsSizeList.value = []
                goodsColorList.value = []
            }
        }
    )

    watch(
        () => reqGoodsData.data.value?.data,
        (val) => {
            console.log(val)
        }
    )

    const p = {
        djbh: "",
        zdrid: userInfo.Dydm,
    }

    watch(
        () => formData.value.djbh,
        (val) => {
            p.djbh = val
        }
    )
    const reqData = useFetch(config.API + "/Work/Getpdjxfhsj", {
        ...config.DEFAULT_FETCH_CONFIG,
        data: p,
    })
    onLoad((e: any) => {
        if (e.code) {
            // 编辑
            p.djbh = e.code
            reqData.getData()
        }
    })
    watch(
        () => reqData.data.value,
        (val) => {
            if (val?.status == 200) {
                formData.value.djbh = val?.data?.djbh
                formData.value.ckdm = val?.data?.ckdm
                formData.value.kwdm = val?.data?.kwdm
                formData.value.rq = val?.data?.rq
                formData.value.djlx = val?.data?.djlx
                count.value.number = val?.data?.sl
                count.value.size = val?.data?.ks
            } else {
                if(count.value.number == 0 && count.value.size == 0){
                    return
                }
                uni.showToast({
                    icon: "error",
                    title: reqData.data.value?.msg || "获取失败",
                })
            }
        }
    )
    onShow(() => {
        if (p.djbh) {
            reqData.getData()
        }
    })
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
        <entering v-if="formData.djbh"></entering>
    </tm-app>
</template>

<style lang="scss" scoped></style>
