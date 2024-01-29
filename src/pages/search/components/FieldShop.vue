<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-24 19:28:17
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-25 21:39:54
 * @FilePath: \tmui_demo\src\pages\search\components\FieldShop.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, nextTick, onMounted, inject } from "vue"
    import { FormDataKey } from "../InjectionKey"

    const formData = inject(FormDataKey)
    const shopName = ref("")
    onMounted(() =>
        nextTick(() => {
            const shopData = uni.getStorageSync("shopData")
            console.log(">>>shopData", shopData)
            shopName.value = shopData?.Khmc
            if (formData && !formData.value.Ckdm)
                formData.value.Ckdm = shopData?.Khdm
        })
    )
</script>
<script lang="ts">
    export default {
        name: "FieldShop",
    }
</script>
<template>
    <view class="flex flex-row flex-row-center-between">
        <tm-text
            :font-size="32"
            :userInteractionEnabled="false"
            :label="shopName || '请选择商店'"
        ></tm-text>
    </view>
</template>

<style lang="scss" scoped></style>
