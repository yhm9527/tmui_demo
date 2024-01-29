<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-19 14:08:00
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-27 14:02:51
 * @FilePath: \tmui_demo\src\pages\takeStock\components\FieldDate.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, inject, nextTick, onMounted } from "vue"
    import { TakeStockFormDataKey } from "../InjectionKey"
    import { useDateFormat } from "@vueuse/core"
    const formData = inject(TakeStockFormDataKey)
    // 显示时间选择
    const show = ref(false)
    const click = () => {
        if (formData?.value.djbh) {
            return
        }
        show.value = true
    }
    onMounted(() =>
        nextTick(() => {
            const nowData = useDateFormat(new Date(), "YYYY-MM-DD").value
            if (formData && !formData.value.rq) formData.value.rq = nowData
        })
    )
</script>
<script lang="ts">
    export default {
        name: "FieldDate",
    }
</script>
<template>
    <view
        @click="click"
        class="flex flex-row flex-row-center-between"
        v-if="formData"
    >
        <tm-text
            _class="mr-10"
            :font-size="32"
            :color="formData.djbh ? 'grey' : 'black'"
            :userInteractionEnabled="false"
            :label="formData.rq || '请选择日期'"
        ></tm-text>
        <tm-icon
            :userInteractionEnabled="false"
            :font-size="24"
            name="tmicon-angle-right"
        ></tm-icon>
    </view>
    <!-- 时间选择 -->
    <tm-time-picker
        v-if="formData"
        v-model:show="show"
        v-model="formData.rq"
        :defaultValue="formData.rq"
        format="YYYY-MM-DD"
        v-model:model-str="formData.rq"
    ></tm-time-picker>
</template>

<style lang="scss" scoped></style>
