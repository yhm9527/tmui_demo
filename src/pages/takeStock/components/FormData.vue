<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-19 09:27:07
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-19 14:40:57
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\components\FormData.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref } from "vue"
    import FieldDate from "./FieldDate.vue"
    import FieldShop from "./FieldShop.vue"
    import FieldGroup from "./FieldGroup.vue"
    import FieldPrice from "./FieldPrice.vue"
    import FieldGoods from "./FieldGoods.vue"

    const formData = ref({
        time: "",
    })
</script>
<script lang="ts">
    export default {
        name: "FormData",
    }
</script>
<template>
    <tm-form
        ref="form"
        :label-width="150"
        v-model="formData"
    >
        <tm-form-item :margin="[0, 0]">
            <view class="flex px-20">
                <tm-button
                    label="开单"
                    :margin="[10]"
                    size="small"
                ></tm-button>
                <tm-button
                    color="green"
                    label="查询"
                    :margin="[10]"
                    size="small"
                ></tm-button>
            </view>
        </tm-form-item>
        <tm-form-item label="单号" :margin="[0, 0]">
            <tm-text
                :userInteractionEnabled="false"
                label="123456789"
            ></tm-text>
        </tm-form-item>
        <tm-form-item
            required
            label="日期"
            field="time"
            :margin="[0, 0]"
        >
            <field-date></field-date>
        </tm-form-item>
        <tm-form-item
            required
            label="商店"
            field="time"
            :margin="[0, 0]"
        >
            <field-shop></field-shop>
        </tm-form-item>
        <tm-form-item
            required
            label="柜组"
            field="time"
            :margin="[0, 0]"
        >
            <field-group></field-group>
        </tm-form-item>
        <tm-form-item
            required
            label="价格"
            field="time"
            :margin="[0, 0]"
        >
            <field-price></field-price>
        </tm-form-item>
        <tm-form-item
            required
            label="商品"
            field="time"
            :border="false"
            :margin="[0, 0]"
        >
            <field-goods></field-goods>
        </tm-form-item>
    </tm-form>
</template>

<style lang="scss" scoped></style>
