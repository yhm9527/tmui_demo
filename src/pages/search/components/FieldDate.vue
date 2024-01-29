<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 20:38:59
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-27 14:44:56
 * @FilePath: \tmui_demo\src\pages\search\components\FieldDate.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, computed, inject, watch } from "vue"
    import { FormDataKey } from "../InjectionKey"
    import { useDateFormat } from "@vueuse/core"
    const formData = inject(FormDataKey)
    const show = ref(false)
    const dateValue = ref<string[]>([])
    const dateValue_str = computed(() =>
        dateValue.value.filter((item) => item).join("~")
    )

    watch(
        () => dateValue.value,
        (val) => {
            if (!formData) {
                return
            }
            formData.value.Strq = val[0]
            formData.value.Edrq = val[1]
        }
    )

    // 日期范围 默认为今天
    dateValue.value = [
        useDateFormat(new Date(), "YYYY-MM-DD").value,
        useDateFormat(new Date(), "YYYY-MM-DD").value,
    ]
</script>
<script lang="ts">
    export default {
        name: "FieldDate",
    }
</script>
<template>
    <!-- 时间选择 -->
    <view
        @click="show = !show"
        class="flex flex-row flex-row-center-between"
    >
        <tm-text
            :font-size="32"
            :userInteractionEnabled="false"
            :label="dateValue_str || '请选择日期范围'"
        ></tm-text>
        <tm-icon
            :userInteractionEnabled="false"
            :font-size="24"
            name="tmicon-angle-right"
        ></tm-icon>
    </view>
    <tm-drawer
        v-model:show="show"
        :height="900"
        hideHeader
    >
        <view class="pa-16">
            <tm-time-between
                @confirm="show = false"
                :asyncModel="false"
                format="YYYY-MM-DD"
                v-model="dateValue"
                v-model:model-str="dateValue"
                :default-value="dateValue"
            ></tm-time-between>
        </view>
    </tm-drawer>
</template>

<style lang="scss" scoped></style>
