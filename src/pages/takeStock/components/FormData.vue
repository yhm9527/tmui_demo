<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-19 09:27:07
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-23 10:03:18
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\components\FormData.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, inject, computed, watch } from "vue"
    import { TakeStockFormDataKey } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    import FieldDate from "./FieldDate.vue"
    import FieldShop from "./FieldShop.vue"
    import FieldGroup from "./FieldGroup.vue"
    import FieldPrice from "./FieldPrice.vue"
    import FieldGoods from "./FieldGoods.vue"
    import FieldScan from "./FieldScan.vue"

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

    const reqOpenCode = useFetch(DEFAULT_API + "/Work/Getpddh", {
        ...DEFAULT_FETCH_CONFIG,
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
            url: "/pages/searchDetail/searchDetail?isDelete=1&code=" + formData?.value.djbh,
        })
    }
</script>
<script lang="ts">
    export default {
        name: "FormData",
    }
</script>
<template>
    <tm-form
        v-if="formData"
        ref="form"
        :label-width="150"
        v-model="formData"
        :round="[5]"
        :margin="[24, 24]"
    >
        <tm-form-item :margin="[0, 0]">
            <view class="flex px-20">
                <tm-button
                    :disabled="openCodeDisabled"
                    label="开单"
                    :margin="[10]"
                    size="small"
                    @click="reqOpenCode.getData()"
                ></tm-button>
                <tm-button
                    :disabled="formData?.djbh == ''"
                    color="green"
                    label="查询"
                    :margin="[10]"
                    size="small"
                    @click="goSearchDetail()"
                ></tm-button>
            </view>
        </tm-form-item>
        <tm-form-item
            v-if="formData?.djbh"
            label="单号"
            field="djbh"
            :margin="[0, 0]"
        >
            <tm-text
                :userInteractionEnabled="false"
                :label="formData?.djbh"
            ></tm-text>
        </tm-form-item>
        <tm-form-item
            required
            label="日期"
            field="rq"
            :margin="[0, 0]"
        >
            <field-date></field-date>
        </tm-form-item>
        <tm-form-item
            required
            label="商店"
            field="ckdm"
            :margin="[0, 0]"
        >
            <field-shop></field-shop>
        </tm-form-item>
        <tm-form-item
            required
            label="柜组"
            field="kwdm"
            :margin="[0, 0]"
        >
            <field-group></field-group>
        </tm-form-item>
        <tm-form-item
            required
            label="价格"
            field="time"
            :margin="[0, 0]"
            :border="!!formData.djbh"
        >
            <field-price></field-price>
        </tm-form-item>
        <!-- 扫描录入 -->
        <tm-form-item
            v-show="formData.djbh"
            label="扫描录入"
            :margin="[0, 0]"
        >
            <field-scan></field-scan>
        </tm-form-item>
        <tm-form-item
            v-show="formData.djbh"
            label="商品"
            :border="false"
            :margin="[0, 0]"
        >
            <field-goods></field-goods>
        </tm-form-item>
    </tm-form>
</template>

<style lang="scss" scoped></style>
