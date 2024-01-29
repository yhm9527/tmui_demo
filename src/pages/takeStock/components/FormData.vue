<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-19 09:27:07
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-28 11:08:05
 * @FilePath: \tmui_demo\src\pages\takeStock\components\FormData.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, inject, computed, watch } from "vue"
    import { TakeStockFormDataKey } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"
    import FieldDate from "./FieldDate.vue"
    import FieldShop from "./FieldShop.vue"
    import FieldGroup from "./FieldGroup.vue"
    import FieldPrice from "./FieldPrice.vue"
    import FieldGoods from "./FieldGoods.vue"
    import FieldScan from "./FieldScan.vue"
    const userInfo = uni.getStorageSync("userInfo")
    const formData = inject(TakeStockFormDataKey)
    const openCodeDisabled = computed(() => {
        if (
            formData &&
            formData.value.ckdm &&
            formData.value.kwdm &&
            formData.value.rq &&
            formData.value.djlx.length > 0
        ) {
            return false
        }
        return true
    })

    const reqOpenCode = useFetch(config.API + "/Work/Getpddh", {
        ...config.DEFAULT_FETCH_CONFIG,
    })

    watch(
        () => reqOpenCode.data.value?.data,
        (val) => {
            if (!formData) {
                return
            }
            formData.value.djbh = val
        }
    )
    const goSearchDetail = () => {
        uni.navigateTo({
            url:
                "/pages/searchDetail/searchDetail?isDelete=1&code=" +
                formData?.value.djbh,
        })
    }
</script>
<script lang="ts">
    export default {
        name: "FormData",
    }
</script>
<template>
    <tm-sheet
        :margin="[24]"
        :round="[5]"
    >
        <view class="flex mb-10">
            <tm-text
                _class="mr-20"
                :font-size="32"
                :label="'账号: ' + userInfo.Dydm"
            ></tm-text>
            <tm-text
                :font-size="32"
                :label="'名称: ' + userInfo.Dymc"
            ></tm-text>
        </view>
        <view class="flex mb-10">
            <tm-button
                :disabled="openCodeDisabled"
                label="开单"
                :margin="[0, 0]"
                size="small"
                :font-size="32"
                @click="reqOpenCode.getData()"
            ></tm-button>
            <tm-button
                :disabled="formData?.djbh == ''"
                color="green"
                label="查询"
                :margin="[40, 0, 0, 0]"
                size="small"
                :font-size="32"
                @click="goSearchDetail()"
            ></tm-button>
        </view>
        <view
            class="flex mb-10"
            v-if="formData?.djbh"
        >
            <tm-text
                _class="mr-20"
                :font-size="32"
                label="单号"
            ></tm-text>
            <tm-text
                :font-size="32"
                :label="formData?.djbh"
            ></tm-text>
        </view>
        <tm-row
            :gutter="5"
            :column="2"
        >
            <tm-col align="start">
                <view class="flex">
                    <tm-text
                        _class="mr-20"
                        :font-size="32"
                        label="日期"
                    ></tm-text>
                    <field-date></field-date>
                </view>
            </tm-col>
            <tm-col align="start">
                <view class="flex">
                    <tm-text
                        _class="mr-20"
                        :font-size="32"
                        label="价格"
                    ></tm-text>
                    <field-price></field-price>
                </view>
            </tm-col>
        </tm-row>
        <tm-row
            :gutter="5"
            :column="2"
        >
            <tm-col align="start">
                <view class="flex">
                    <tm-text
                        _class="mr-20"
                        :font-size="32"
                        label="商店"
                    ></tm-text>
                    <field-shop></field-shop>
                </view>
            </tm-col>
            <tm-col align="start">
                <view class="flex">
                    <tm-text
                        _class="mr-20"
                        :font-size="32"
                        label="柜组"
                    ></tm-text>
                    <field-group></field-group>
                </view>
            </tm-col>
        </tm-row>
        <tm-row
            :column="1"
            :height="80"
            v-if="formData?.djbh"
        >
            <tm-col align="start">
                <view class="flex flex-row-center-between">
                    <tm-text
                        _class="mr-20"
                        :font-size="32"
                        label="扫描录入"
                    ></tm-text>
                    <field-scan></field-scan>
                </view>
            </tm-col>
        </tm-row>
        <tm-row
            :column="1"
            v-if="formData?.djbh"
            :height="80"
        >
            <tm-col align="start">
                <view class="flex flex-row-center-between">
                    <tm-text
                        _class="mr-20"
                        :font-size="32"
                        label="商品"
                    ></tm-text>
                    <field-goods></field-goods>
                </view>
            </tm-col>
        </tm-row>
    </tm-sheet>
</template>

<style lang="scss" scoped></style>
