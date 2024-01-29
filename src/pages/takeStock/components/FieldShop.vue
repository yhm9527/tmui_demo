<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-19 09:27:07
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-28 11:23:47
 * @FilePath: \tmui_demo\src\pages\takeStock\components\FieldShop.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, nextTick, onMounted, inject } from "vue"
    import { TakeStockFormDataKey } from "../InjectionKey"

    const formData = inject(TakeStockFormDataKey)
    const shopName = ref("")
    onMounted(() =>
        nextTick(() => {
            const shopData = uni.getStorageSync("shopData")
            shopName.value = shopData?.Khmc
            if (formData && !formData.value.ckdm)
                formData.value.ckdm = shopData?.Khdm
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
            style="width: 230rpx;"
            _class="mr-10"
            :font-size="32"
            :color="formData?.djbh ? 'grey' : 'black'"
            :userInteractionEnabled="false"
            :label="shopName || '请选择商店'"
        ></tm-text>
    </view>
</template>

<style lang="scss" scoped></style>
