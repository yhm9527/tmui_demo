<script setup lang="ts">
    import { ref } from "vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    // 显示时间选择
    const show = ref(false)
    const time = ref("")
</script>
<script lang="ts">
    export default {
        name: "FieldDate",
    }
</script>
<template>
    <view
        @click="show = !show"
        class="flex flex-row flex-row-center-between"
    >
        <tm-text
            :userInteractionEnabled="false"
            :label="time || '请选择日期'"
        ></tm-text>
        <tm-icon
            :userInteractionEnabled="false"
            :font-size="24"
            name="tmicon-angle-right"
        ></tm-icon>
    </view>
    <!-- 时间选择 -->
    <tm-time-picker
        v-model:show="show"
        v-model="time"
        :defaultValue="time"
        format="YYYY/MM/DD"
        v-model:model-str="time"
    ></tm-time-picker>
</template>

<style lang="scss" scoped></style>
