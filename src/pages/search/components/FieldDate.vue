<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 20:38:59
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-21 21:20:37
 * @FilePath: \tmui_demo\src\pages\search\components\FieldDate.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, computed } from "vue"
    const show = ref(false)
    const dateValue = ref([])
    const dateValue_str = computed(() =>  dateValue.value.filter((item) => item).join("~"))
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
                format="YYYY/MM/DD"
                v-model="dateValue"
                v-model:model-str="dateValue"
                :default-value="dateValue"
            ></tm-time-between>
        </view>
    </tm-drawer>
</template>

<style lang="scss" scoped></style>
