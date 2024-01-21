<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 20:28:49
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-21 21:40:18
 * @FilePath: \tmui_demo\src\pages\search\components\FormData.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, reactive, computed } from "vue"
    import FieldDate from "./FieldDate.vue"
    import FieldShop from "./FieldShop.vue"

    const statusList = ref([
        { text: "全部", val: "" },
        { text: "已提交", val: 1 },
        { text: "未提交", val: 0 },
    ])

    type TFormData = {
        Zt: string | number
    }

    const formData = reactive<TFormData>({
        Zt: "",
    })

    const statusText = computed(() => {
        return statusList.value.find((item) => item.val === formData.Zt)?.text
    })

    const queryStatus = (e: {
        index: number
        data: { val: string | number }
    }) => {
        formData.Zt = e.data.val
    }
</script>
<script lang="ts">
    export default {
        name: "FormData",
    }
</script>
<template>
    <tm-form
        v-model="formData"
        :label-width="150"
        :margin="[0, 0]"
    >
        <tm-form-item
            label="日期"
            :margin="[0, 0]"
            :border="false"
        >
            <field-date></field-date>
        </tm-form-item>
        <tm-form-item
            label="制单人"
            :margin="[0, 0]"
            :border="false"
        >
            <tm-input placeholder="请输入制单人"></tm-input>
        </tm-form-item>
        <tm-form-item
            label="单号"
            :margin="[0, 0]"
            :border="false"
        >
            <tm-input placeholder="请输入单号"></tm-input>
        </tm-form-item>
        <tm-form-item
            label="商店"
            :margin="[0, 0]"
            :border="false"
        >
            <field-shop></field-shop>
        </tm-form-item>
        <tm-form-item
            label="状态"
            :margin="[0, 0]"
            :border="false"
        >
            <tm-dropdown
                position="tl"
                color="grey-darken-4"
                :width="220"
                :list="statusList"
                :haveArrow="false"
                @click="queryStatus"
            >
                <tm-text :label="statusText"></tm-text>
            </tm-dropdown>
        </tm-form-item>
    </tm-form>
</template>

<style lang="scss" scoped></style>
